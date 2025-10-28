<template>
  <div class="relative">
    <HamburgerMenu @logout-request="handleLogoutRequest"/>

    <main class="min-h-screen bg-gray-50 pl-16 md:pl-20">
      <slot />
    </main>

    <ConfirmationPopUp
      :isOpen="showLogoutPopup"
      title="Cierre de sesión"
      message="¿Estás seguro de que deseas cerrar sesión?"
      type="warning"
      confirmText="Cerrar sesión"
      cancelText="Cancelar"
      @confirm="handleLogout"
      @cancel="handleLogoutCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/presentation/stores/authStore'
import HamburgerMenu from '@/presentation/components/UI/HamburgerMenu.vue'
import ConfirmationPopUp from '@/presentation/components/UI/ConfirmationPopUp.vue'

const authStore = useAuthStore()
const showLogoutPopup = ref(false)

const handleLogoutRequest = () => {
  showLogoutPopup.value = true
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    window.location.href = '/login'
  } catch (error) {
    console.error('Logout error:', error)
    window.location.href = '/login'
  } finally {
    showLogoutPopup.value = false
  }
}

const handleLogoutCancel = () => {
  showLogoutPopup.value = false
}
</script>
