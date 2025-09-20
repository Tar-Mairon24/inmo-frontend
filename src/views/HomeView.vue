<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded shadow max-w-md w-full text-center">
      <h1 class="text-3xl font-bold mb-4">Welcome Home!</h1>
      <p class="text-gray-700 mb-6">You are logged in. This is your home page.</p>
      <button
        @click="handleLogout"
        class="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>
