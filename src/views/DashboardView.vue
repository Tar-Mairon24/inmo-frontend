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
    <div v-if="selectedProperty" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 class="text-2xl font-bold mb-4">{{ selectedProperty.title }}</h2>
        <!-- Add more details here -->
        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded" @click="selectedProperty = null">Close</button>
      </div>
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
import PropertyCard from '@/components/PropertyCard.vue'
import { PropertyCard as Property } from '@/models/Property'
import { useAuthStore } from '@/stores/authStore'
import placeholderImage from '@/assets/images/propertyImagePlaceholder.jpg'
import { useRouter } from 'vue-router'

const properties = ref<Property[]>([])
const selectedProperty = ref<Property | null>(null)


const auth = useAuthStore()

const showDetails = (property: Property) => {
  selectedProperty.value = property
}

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8081/api/v1/properties', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    const data = await response.json()

    if (Array.isArray(data)) {
      properties.value = data.map((property: Property) => ({
        ...property,
        image: placeholderImage
      }))
    } else {
      console.error('Unexpected data format:', data)
    }
  } catch (error) {
    console.error('Error fetching properties:', error)
  }
})

const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}

</script>
