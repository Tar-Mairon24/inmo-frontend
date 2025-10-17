<template>
  <div
    class="bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition min-w-[250px] max-w-[400px]"
    @click="onClick"
  >
    <img :src="image" alt="Property" class="w-full h-48 object-cover rounded mb-4" />
    <h2 class="text-xl font-bold mb-2">{{ property.title }}</h2>
    <p class="text-gray-700 mb-2">Price: ${{ property.price.toLocaleString() }}</p>
    <div class="flex gap-4 mb-2">
      <span>{{ property.bedrooms }} Beds</span>
      <span>{{ property.bathrooms }} Baths</span>
      <span>{{ property.construction_m2 }} m²</span>
    </div>
    <p class="text-gray-600 mb-1">{{ property.city }}, {{ property.neighborhood }}</p>
    <p class="text-gray-600 mb-1">Type: {{ property.property_type }}</p>
    <p class="text-gray-600 mb-1">Transaction: {{ property.transaction_type }}</p>
    <p class="text-gray-600 mb-1">Status: {{ property.status }}</p>
    <p class="text-gray-400 text-xs">Created: {{ formatDate(property.created_at) }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { PropertyCard as Property } from '@/domain/entities/Property'

const props = defineProps<{
  property: Property
  image?: string
}>()

const emit = defineEmits(['select'])

const onClick = () => {
  emit('select', props.property)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}
</script>
