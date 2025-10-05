<!-- filepath: src/views/DashboardView.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="text-3xl font-bold mb-8">Properties Dashboard</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <PropertyCard
        v-for="property in properties"
        :key="property.id"
        :property="property"
        :image="placeholderImage"
        @select="showDetails"
      />
    </div>
  </div>

  <footer class="bg-white shadow mt-8">
    <div class="max-w-7xl mx-auto py-4 px-6">
      <button @click="handleLogout" class="text-sm text-gray-600 hover:text-gray-900">Logout</button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PropertyCard from '../components/PropertyCard.vue'
import type { PropertyCard as Property } from '../../domain/entities/Property'
import placeholderImage from '@/assets/images/propertyImagePlaceholder.jpg'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/presentation/stores/authStore'
import { container } from '@/shared/di/Container'

const properties = ref<Property[]>([])

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
        image: placeholderImage
      }))
    } else {
      console.error('Unexpected data format:', fetchedProperties)
    }
  } catch (error) {
    console.error('Error fetching properties:', error)
  }
})

const router = useRouter()

const handleLogout = async () => {
  try {
    await useAuthStore().logout()
    window.location.href = '/login'
  } catch (error) {
    console.error('Logout error:', error)
    window.location.href = '/login'
  }
}

</script>
