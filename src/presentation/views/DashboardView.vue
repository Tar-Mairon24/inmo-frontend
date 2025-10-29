<template>
  <DashboardLayout>
    <div class="p-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Mis Propiedades</h1>
        <button
          @click="addProperty"
          class="mr-8 py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H4a1 1 0 110-2h6V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Agregar Propiedad
        </button>
      </div>
      <div
        v-if="properties.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <PropertyCard
          v-for="property in properties"
          :key="property.id"
          :property="property"
          :image="placeholderImage"
          @select="showDetails"
          @delete="confirmDelete"
          @edit="handleEdit"
        />

      </div>
      <EmptyState v-else
        title="Oops — No encontramos propiedades"
        subtitle="No tenemos propiedades para mostrar en este momento."
        actionLabel="Crear propiedad"
        @retry="fetchProperties"
      />
    </div>
    <ConfirmationPopUp
      :isOpen="showDeletePopup"
      title="Delete Property"
      message="Are you sure you want to delete this property? This action cannot be undone."
      type="danger"
      confirmText="Delete"
      cancelText="Cancel"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PropertyCard from '@/presentation/components/properties/PropertyCard.vue'
import DashboardLayout from '@/presentation/components/layouts/DashboardLayout.vue'
import type { PropertyCard as Property } from '@/domain/entities/Property'
import placeholderImage from '@/assets/images/propertyImagePlaceholder.jpg'
import { useRouter } from 'vue-router'
import { container } from '@/shared/di/Container'
import { useAuthStore } from '@/presentation/stores/authStore'
import EmptyState from '../components/errorpages/EmptyState.vue'
import ConfirmationPopUp from '@/presentation/components/UI/ConfirmationPopUp.vue'

const properties = ref<Property[]>([])
const router = useRouter()
const AuthStore = useAuthStore()
const propertyService = container.getPropertyService()
const showDeletePopup = ref(false)
const propertyToDelete = ref<number | null>(null)

const showDetails = (property: Property) => {
  router.push(`/property/${property.id}`)
}

const handleEdit = (propertyId: number) => {
  router.push(`/property/edit/${propertyId}`)
}

const confirmDelete = (propertyId: number) => {
  propertyToDelete.value = propertyId
  showDeletePopup.value = true
}

const handleDeleteConfirm = async () => {
  if (propertyToDelete.value) {
    try {
      const success = await propertyService.deleteProperty(propertyToDelete.value)
      if (success) {
        properties.value = properties.value.filter(prop => prop.id !== propertyToDelete.value)
      } else {
        console.error('Failed to delete property')
      }
    } catch (error) {
      console.error('Error deleting property:', error)
    }
  }
  handleDeleteCancel()
}

const handleDeleteCancel = () => {
  showDeletePopup.value = false
  propertyToDelete.value = null
}

const fetchProperties = async () => {
  if (!AuthStore.isAuthenticated) {
    console.log('User not authenticated, skipping property fetch')
    router.push('/login')
    return
  }

  try {
    const fetchedProperties = await propertyService.getAllProperties()

    if (Array.isArray(fetchedProperties)) {
      properties.value = fetchedProperties.map((property: Property) => ({
        ...property,
        image: placeholderImage,
      }))
    } else {
      console.error('Unexpected data format:', fetchedProperties)
      properties.value = []
    }
  } catch (error) {
    console.error('Error fetching properties:', error)
    properties.value = []

    if (error instanceof Error && error.message.includes('401')) {
      console.log('Authentication error, redirecting to login')
      router.push('/login')
    }
  }
}

const addProperty = () => {
  router.push('/property/new')
}

onMounted(async () => {
  if (AuthStore.isAuthenticated) {
    await fetchProperties()
  } else {
    console.log('User not authenticated on mount, redirecting to login')
    router.push('/login')
  }
})
</script>
