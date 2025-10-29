<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <HamburgerMenu />
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <button
            @click="router.back()"
            class="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ← Back to Dashboard
          </button>
          <h1 class="text-3xl font-bold">
            {{ isEditMode ? 'Edit Property' : 'Add New Property' }}
          </h1>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow p-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Basic Information -->
          <div>
            <h2 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Basic Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Property title"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input
                  v-model.number="form.price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <!-- Location Information -->
          <div>
            <h2 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Location</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  v-model="form.address"
                  type="text"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Street address"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    v-model="form.city"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Neighborhood</label>
                  <input
                    v-model="form.neighborhood"
                    type="text"
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Neighborhood"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                  <input
                    v-model="form.zone"
                    type="text"
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Zone"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                <textarea
                  v-model="form.reference"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                  placeholder="Location reference"
                />
              </div>
            </div>
          </div>

          <!-- Property Type & Transaction -->
          <div>
            <h2 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Property Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                <select
                  v-model="form.property_type"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                  <option value="storehouse">Storehouse</option>
                  <option value="office">Office</option>
                  <option value="industrial">Industrial</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Transaction Type *</label>
                <select
                  v-model="form.transaction_type"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="sale">Sale</option>
                  <option value="rental">Rental</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  v-model="form.status"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Measurements & Rooms -->
          <div>
            <h2 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Measurements & Rooms</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Construction (m²)</label>
                <input
                  v-model.number="form.construction_m2"
                  type="number"
                  min="0"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Land (m²)</label>
                <input
                  v-model.number="form.land_m2"
                  type="number"
                  min="0"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Garden (m²)</label>
                <input
                  v-model.number="form.garden_m2"
                  type="number"
                  min="0"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Floors</label>
                <input
                  v-model.number="form.floors"
                  type="number"
                  min="1"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <input
                  v-model.number="form.bedrooms"
                  type="number"
                  min="0"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <input
                  v-model.number="form.bathrooms"
                  type="number"
                  min="0"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Garage Size</label>
                <input
                  v-model.number="form.garage_size"
                  type="number"
                  min="0"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <!-- Property Features -->
          <div>
            <h2 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Property Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Occupied</label>
                <label class="flex items-center">
                  <input
                    v-model="form.is_occupied"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span class="ml-2 text-sm text-gray-700">Property is currently occupied</span>
                </label>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Furnished</label>
                <label class="flex items-center">
                  <input
                    v-model="form.is_furnished"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span class="ml-2 text-sm text-gray-700">Property comes furnished</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Additional Features -->
          <div>
            <h2 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Additional Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Gas Types -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Gas Types</label>
                <ArrayInput
                  v-model="form.gas_types"
                  placeholder="Add gas type"
                  :suggestions="gasSuggestions"
                />
              </div>

              <!-- Amenities -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <ArrayInput
                  v-model="form.amenities"
                  placeholder="Add amenity"
                  :suggestions="amenitySuggestions"
                />
              </div>

              <!-- Extras -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Extras</label>
                <ArrayInput
                  v-model="form.extras"
                  placeholder="Add extra"
                  :suggestions="extraSuggestions"
                />
              </div>

              <!-- Utilities -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Utilities</label>
                <ArrayInput
                  v-model="form.utilities"
                  placeholder="Add utility"
                  :suggestions="utilitySuggestions"
                />
              </div>
            </div>
          </div>
          <!-- Notes -->
          <div>
            <h2 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Additional Notes</h2>
            <textarea
              v-model="form.notes"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Additional notes about the property..."
            />
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              @click="router.back()"
              class="px-6 py-3 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Saving...' : (isEditMode ? 'Update Property' : 'Create Property') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" class="fixed top-4 right-4 z-50">
      <div
        :class="{
          'bg-green-500': messageType === 'success',
          'bg-red-500': messageType === 'error'
        }"
        class="text-white px-6 py-3 rounded-lg shadow-lg"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HamburgerMenu from '@/presentation/components/UI/HamburgerMenu.vue'
import ArrayInput from '@/presentation/components/form/ArrayInput.vue'
import { container } from '@/shared/di/Container'
import { useAuthStore } from '@/presentation/stores/authStore'
import type { property_status, property_type, PropertyDetail, transaction_type } from '@/domain/entities/Property'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const propertyService = container.getPropertyService()

const isLoading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const isEditMode = computed(() => !!route.params.id)
const propertyId = computed(() => route.params.id ? Number(route.params.id) : null)

// Form data
const form = ref({
  title: '',
  price: 0,
  address: '',
  neighborhood: '',
  city: '',
  zone: '',
  reference: '',
  property_type: '',
  transaction_type: '',
  status: 'available',
  construction_m2: 0,
  land_m2: 0,
  garden_m2: 0,
  floors: 1,
  bedrooms: 0,
  bathrooms: 0,
  garage_size: 0,
  is_occupied: false,
  is_furnished: false,
  gas_types: [] as string[],
  amenities: [] as string[],
  extras: [] as string[],
  utilities: [] as string[],
  notes: ''
})

const gasSuggestions = ['Natural Gas', 'Propane', 'Electric', 'Solar']
const amenitySuggestions = ['Pool', 'Gym', 'Parking', 'Security', 'Elevator', 'Air Conditioning', 'Heating']
const extraSuggestions = ['Balcony', 'Terrace', 'Fireplace', 'Walk-in Closet', 'Storage', 'Laundry Room']
const utilitySuggestions = ['Electricity', 'Water', 'Internet', 'Cable TV', 'Phone', 'Garbage Collection']

const loadProperty = async () => {
  if (!isEditMode.value || !propertyId.value) return

  try {
    isLoading.value = true
    const property = await propertyService.getPropertyById(propertyId.value)

    if (property) {
      form.value = {
        title: property.title,
        price: property.price,
        address: property.address,
        neighborhood: property.neighborhood || '',
        city: property.city,
        zone: property.zone || '',
        reference: property.reference || '',
        property_type: property.property_type,
        transaction_type: property.transaction_type,
        status: property.status || 'available',
        construction_m2: property.construction_m2 || 0,
        land_m2: property.land_m2 || 0,
        garden_m2: property.garden_m2 || 0,
        floors: property.floors || 1,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        garage_size: property.garage_size || 0,
        is_occupied: property.isOccupied || false,
        is_furnished: property.isFurnished || false,
        gas_types: property.gas_type || [],
        amenities: property.amenities || [],
        extras: property.extras || [],
        utilities: property.utilities || [],
        notes: property.notes || ''
      }
    } else {
      showMessage('Property not found', 'error')
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Error loading property:', error)
    showMessage('Error loading property', 'error')
  } finally {
    isLoading.value = false
  }
}

// Handle form submission
const handleSubmit = async () => {
  try {
    isLoading.value = true

    console.log('Auth Response:', authStore.AuthResponse) // Debug log
    const currentUserId = authStore.AuthResponse?.data?.id
    console.log('Current User ID:', currentUserId) // Debug log

    if (!currentUserId) {
      showMessage('User not authenticated', 'error')
      return
    }

    const propertyData: PropertyDetail = {
      title: form.value.title,
      address: form.value.address,
      neighborhood: form.value.neighborhood,
      city: form.value.city,
      zone: form.value.zone,
      reference: form.value.reference,
      price: form.value.price,
      construction_m2: form.value.construction_m2,
      land_m2: form.value.land_m2,
      garden_m2: form.value.garden_m2,
      floors: form.value.floors,
      bedrooms: form.value.bedrooms,
      bathrooms: form.value.bathrooms,
      garage_size: form.value.garage_size,
      isOccupied: form.value.is_occupied,
      isFurnished: form.value.is_furnished,
      gas_type: form.value.gas_types,
      amenities: form.value.amenities,
      extras: form.value.extras,
      utilities: form.value.utilities,
      notes: form.value.notes,
      property_type: form.value.property_type as property_type,
      transaction_type: form.value.transaction_type as transaction_type,
      status: form.value.status as property_status,
      user_id: currentUserId,
      owner_id: currentUserId
    }

    if (isEditMode.value && propertyId.value) {
      // Update existing property
      await propertyService.updateProperty(propertyId.value, propertyData)
      showMessage('Property updated successfully!', 'success')
    } else {
      // Create new property
      await propertyService.createProperty(propertyData)
      showMessage('Property created successfully!', 'success')
    }

    // Redirect to dashboard after short delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  } catch (error) {
    console.error('Error saving property:', error)
    showMessage('Error saving property. Please try again.', 'error')
  } finally {
    isLoading.value = false
  }
}

// Show message with auto-hide
const showMessage = (text: string, type: 'success' | 'error') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

onMounted(() => {
  loadProperty()
})
</script>
