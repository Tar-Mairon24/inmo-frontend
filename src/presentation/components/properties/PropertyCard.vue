<template>
  <div
    class="relative rounded bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition min-w-[250px] max-w-[400px] group"
    @click="onClick"
  >
    <img :src="image" alt="Property" class="w-full h-48 object-cover rounded mb-4" />
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-bold">{{ property.title }}</h2>
        <div ref="menuRef"  class="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
          @click.stop="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-haspopup="true"
          class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm focus:outline-none"
          title="More actions"
          >
          <svg class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="5" cy="12" r="1.5"></circle>
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="19" cy="12" r="1.5"></circle>
            </svg>
          </button>

          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <button
              @click.stop="onEdit"
              class="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
            >
              <svg class="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
              </svg>
              Editar propiedad
            </button>
            <button
              @click.stop="onDelete"
              class="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600"
            >
            <svg class="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
              <path d="M10 11v6"></path>
              <path d="M14 11v6"></path>
              <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
            </svg>
            Borrar propiedad
          </button>
        </div>
      </div>
    </div>
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
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue'
import type { PropertyCard as Property } from '@/domain/entities/Property'

const props = defineProps<{
  property: Property
  image?: string
}>()

const emit = defineEmits(['select', 'edit', 'delete'])

const isMenuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const onClick = () => {
  emit('select', props.property)
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleDocumentClick = (e: MouseEvent) => {
  const target = e.target as Node
  if (!menuRef.value) return
  if (!menuRef.value.contains(target)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

const onEdit = () => {
  emit('edit', props.property.id)
  closeMenu()
}

const onDelete = () => {
  emit('delete', props.property.id)
  closeMenu()
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}
</script>
