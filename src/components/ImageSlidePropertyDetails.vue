<template>
  <div class="relative mb-8 group">
    <div class="w-full h-96 overflow-hidden rounded-lg">
      <img
        :src="images[currentImageIndex]"
        alt="Property"
        class="w-full h-full object-cover transition-transform duration-300"
      />
    </div>

    <button
      v-if="images.length > 1"
      @click="previousImage"
      class="absolute left-0 top-0 h-full w-12 bg-black bg-opacity-0 hover:bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-l-lg"
    >
      <svg :src="leftArrowIcon" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      v-if="images.length > 1"
      @click="nextImage"
      class="absolute right-0 top-0 h-full w-12 bg-black bg-opacity-0 hover:bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-r-lg"
    >
      <svg :src="rightArrowIcon" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Image indicators -->
    <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-0 hover:bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="currentImageIndex = index"
        class="w-3 h-3 rounded-full transition-colors"
        :class="currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import placeholderImage from '@/assets/images/propertyImagePlaceholder.jpg'
import leftArrowIcon from '@/assets/icons/angle-small-left.svg'
import rightArrowIcon from '@/assets/icons/angle-small-right.svg'

const currentImageIndex = ref(0)
const images = ref([
  placeholderImage,
  placeholderImage,
  placeholderImage,
  placeholderImage,
])

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length
}

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 ? images.value.length - 1 : currentImageIndex.value - 1
}

</script>
