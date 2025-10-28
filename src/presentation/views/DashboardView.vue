<template>
  <DashboardLayout>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-8">Properties Dashboard</h1>
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
import EmptyState from '../components/errorpages/EmptyState.vue'
import ConfirmationPopUp from '@/presentation/components/UI/confirmationPopUp.vue'

const properties = ref<Property[]>([])
const router = useRouter()
const propertyService = container.getPropertyService()
const showDeletePopup = ref(false)
const propertyToDelete = ref<number | null>(null)

const showDetails = (property: Property) => {
  router.push(`/property/${property.id}`)
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
  }
}

onMounted(async () => {
  await fetchProperties()
})
</script>
