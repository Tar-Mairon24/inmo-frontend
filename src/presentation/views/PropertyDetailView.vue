<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <button @click="router.back()" class="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
        ← Back to Dashboard
      </button>
      <div v-if="property" class="bg-white rounded-lg shadow p-8">
        <ImageSlidePropertyDetails />
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ property.title }}</h1>
          <p class="text-2xl text-green-600 font-bold mb-6">${{ property.price.toLocaleString() }}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 class="text-xl font-bold mb-3">Basic Information</h3>
              <div class="space-y-2">
                <p><strong>Address:</strong> {{ property.address }}</p>
                <p><strong>Location:</strong> {{ property.city }}, {{ property.neighborhood }}</p>
                <p><strong>Zone:</strong> {{ property.zone }}</p>
                <p><strong>Type:</strong> {{ property.property_type }}</p>
                <p><strong>Transaction:</strong> {{ property.transaction_type }}</p>
                <p><strong>Status:</strong> {{ property.status }}</p>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-bold mb-3">Property Details</h3>
              <div class="space-y-2">
                <p><strong>Construction:</strong> {{ property.construction_m2 }} m²</p>
                <p><strong>Land:</strong> {{ property.land_m2 }} m²</p>
                <p><strong>Floors:</strong> {{ property.floors }}</p>
                <p><strong>Bedrooms:</strong> {{ property.bedrooms }}</p>
                <p><strong>Bathrooms:</strong> {{ property.bathrooms }}</p>
                <p><strong>Garage Size:</strong> {{ property.garage_size }}</p>
                <p><strong>Garden:</strong> {{ property.garden_m2 }} m²</p>
              </div>
            </div>
          </div>

          <!-- Additional Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 class="text-xl font-bold mb-3">Additional Information</h3>
              <div class="space-y-2">
                <p><strong>Occupied:</strong> {{ property.isOccupied ? 'Yes' : 'No' }}</p>
                <p><strong>Furnished:</strong> {{ property.isFuirnished ? 'Yes' : 'No' }}</p>
                <p><strong>Created:</strong> {{ formatDate(property.created_at) }}</p>
                <p><strong>Updated:</strong> {{ formatDate(property.updated_at) }}</p>
              </div>
            </div>

            <!-- Agent Information -->
            <div v-if="property.agent">
              <h3 class="text-xl font-bold mb-3">Agent Information</h3>
              <div class="space-y-2">
                <p><strong>Name:</strong> {{ property.agent.username }}</p>
                <p><strong>Email:</strong> {{ property.agent.email }}</p>
              </div>
            </div>
          </div>

          <!-- Features Section -->
          <div class="space-y-6">
            <!-- Gas Types -->
            <div v-if="property.gas_type && property.gas_type.length > 0">
              <h3 class="text-xl font-bold mb-3">Gas Types</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="gas in property.gas_type" :key="gas" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {{ gas }}
                </span>
              </div>
            </div>

            <!-- Amenities -->
            <div v-if="property.amenities && property.amenities.length > 0">
              <h3 class="text-xl font-bold mb-3">Amenities</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="amenity in property.amenities" :key="amenity" class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {{ amenity }}
                </span>
              </div>
            </div>

            <!-- Extras -->
            <div v-if="property.extras && property.extras.length > 0">
              <h3 class="text-xl font-bold mb-3">Extras</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="extra in property.extras" :key="extra" class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {{ extra }}
                </span>
              </div>
            </div>

            <!-- Utilities -->
            <div v-if="property.utilities && property.utilities.length > 0">
              <h3 class="text-xl font-bold mb-3">Utilities</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="utility in property.utilities" :key="utility" class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {{ utility }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-else class="bg-white rounded-lg shadow p-8 text-center">
        <p>Loading property details...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { propertyDetail } from '@/domain/entities/Property'
import ImageSlidePropertyDetails from '@/presentation/components/ImageSlidePropertyDetails.vue'

const router = useRouter()
const route = useRoute()
const property = ref<propertyDetail | null>(null)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

onMounted(async () => {
  const propertyId = route.params.id

  try {
    const response = await fetch(`http://localhost:8081/api/v1/properties/${propertyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()

    if (response.ok && data) {
      property.value = data
      // If your backend returns images, replace the placeholder images
      // images.value = data.images || images.value
    } else {
      console.error('Failed to fetch property details:', data)
      router.push('/')
    }
  } catch (error) {
    console.error('Error fetching property details:', error)
    router.push('/')
  }
})
</script>
