<template>
  <DashboardLayout>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-8">Properties Dashboard</h1>
      <div
        v-if="properties.length > 0"
        class="flex flex-col items-center justify-center py-24"
      >
        <PropertyCard
          v-for="property in properties"
          :key="property.id"
          :property="property"
          :image="placeholderImage"
          @select="showDetails"
        />

      </div>
      <EmptyState v-else
        title="Oops — No encontramos propiedades"
        subtitle="No tenemos propiedades para mostrar en este momento."
        actionLabel="Crear propiedad"
        @retry="fetchProperties"
      />
    </div>
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

const properties = ref<Property[]>([])
const router = useRouter()

const showDetails = (property: Property) => {
  router.push(`/property/${property.id}`)
}

const fetchProperties = async () => {
  try {
    const propertyService = container.getPropertyService()
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
