<template>
  <div class="flex flex-col items-center justify-center py-24">
    <svg
      class="w-48 h-48 text-gray-300 mb-6"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="6" y="10" width="52" height="40" rx="4" stroke="currentColor" stroke-width="2" />
      <path d="M20 26h24" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="30" cy="38" r="4" fill="currentColor" />
      <circle cx="40" cy="38" r="4" fill="currentColor" />
    </svg>

    <h2 class="text-2xl font-semibold mb-2">{{ title }}</h2>
    <p class="text-gray-500 mb-6 text-center max-w-md">{{ subtitle }}</p>

    <div class="flex gap-3">
      <button
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        @click="$emit('retry')"
      >
        Volver a intentar
      </button>
      <button
        v-if="actionLabel"
        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
        @click="$emit('action')"
      >
        {{ actionLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  title: { type: String, default: 'Oops — no pudimos encontrar elementos' },
  subtitle: { type: String, default: "Intenta refrescar la página o contactar al administrador." },
  actionLabel: { type: String, default: '' },
})

defineEmits(['retry', 'action'])
</script>
