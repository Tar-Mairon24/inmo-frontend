<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[9999] flex items-center justify-center"
    @click.self="onCancel"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    <!-- Modal -->
    <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10">      <!-- Icon -->
      <!-- Icon -->
      <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full"
           :class="iconBgClass">
        <component :is="iconComponent" class="w-6 h-6" :class="iconClass" />
      </div>

      <!-- Content -->
      <div class="text-center">
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-500 mb-6">{{ message }}</p>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 justify-end">
        <button
          @click="onCancel"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          {{ cancelText }}
        </button>
        <button
          @click="onConfirm"
          class="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors"
          :class="confirmButtonClass"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'

type ModalType = 'danger' | 'warning' | 'info' | 'success'

const props = defineProps<{
  isOpen: boolean
  title: string
  message: string
  type?: ModalType
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const modalType = computed(() => props.type || 'danger')
const confirmText = computed(() => props.confirmText || 'Confirm')
const cancelText = computed(() => props.cancelText || 'Cancel')

const ExclamationTriangleIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
    </svg>
  `
}

const InformationCircleIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  `
}

const CheckCircleIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  `
}

const iconComponent = computed(() => {
  const icons = {
    danger: ExclamationTriangleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
    success: CheckCircleIcon
  }
  return icons[modalType.value]
})

const iconBgClass = computed(() => {
  const classes = {
    danger: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100',
    success: 'bg-green-100'
  }
  return classes[modalType.value]
})

const iconClass = computed(() => {
  const classes = {
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    success: 'text-green-600'
  }
  return classes[modalType.value]
})

const confirmButtonClass = computed(() => {
  const classes = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    info: 'bg-blue-600 hover:bg-blue-700',
    success: 'bg-green-600 hover:bg-green-700'
  }
  return classes[modalType.value]
})

const onConfirm = () => {
  emit('confirm')
}

const onCancel = () => {
  emit('cancel')
}
</script>
