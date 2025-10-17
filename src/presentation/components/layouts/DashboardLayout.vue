<template>
  <div class="relative">
    <HamburgerMenu />

    <main class="min-h-screen bg-gray-50 pl-16 md:pl-20">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import HamburgerMenu from '@/presentation/components/UI/HamburgerMenu.vue'
</script>
