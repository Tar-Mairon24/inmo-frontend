<template>
  <DashboardLayout>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-8">Properties Dashboard</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <PropertyCard
          v-for="property in properties"
          :key="property.id"
          :property="property"
          :image="placeholderImage"
          @select="showDetails"
        />
      </div>
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

const properties = ref<Property[]>([])
const router = useRouter()

const showDetails = (property: Property) => {
  router.push(`/property/${property.id}`)
}

onMounted(async () => {
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
    }
  } catch (error) {
    console.error('Error fetching properties:', error)
  }
})
</script>
