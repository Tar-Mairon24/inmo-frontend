<template>
  <div class="relative">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <button
        v-if="!isMenuOpen"
        @click="toggleMenu"
        class="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <div class="w-6 h-6 flex flex-col justify-center items-center">
          <span class="block w-5 h-0.5 bg-gray-600 -translate-y-1"></span>
          <span class="block w-5 h-0.5 bg-gray-600 opacity-100"></span>
          <span class="block w-5 h-0.5 bg-gray-600 translate-y-1"></span>
        </div>
      </button>
    </Transition>

    <div
      v-if="isMenuOpen"
      @click="closeMenu"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
    ></div>

    <div
      class="fixed top-0 left-0 h-full w-64 z-40 transform transition-transform duration-300 ease-in-out"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <SideMenu @close="closeMenu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SideMenu from './SideMenu.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

defineExpose({
  closeMenu,
  toggleMenu,
  isMenuOpen
})
</script>
