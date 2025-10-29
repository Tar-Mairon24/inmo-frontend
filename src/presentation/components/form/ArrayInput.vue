<template>
  <div class="space-y-2">
    <!-- Input for adding new items -->
    <div class="flex gap-2">
      <input
        v-model="newItem"
        type="text"
        :placeholder="placeholder"
        @keyup.enter="addItem"
        class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="button"
        @click="addItem"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add
      </button>
    </div>

    <!-- Suggestions -->
    <div v-if="suggestions && suggestions.length > 0" class="flex flex-wrap gap-1">
      <button
        v-for="suggestion in filteredSuggestions"
        :key="suggestion"
        type="button"
        @click="addSuggestion(suggestion)"
        class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        + {{ suggestion }}
      </button>
    </div>

    <!-- Current items -->
    <div v-if="modelValue && modelValue.length > 0" class="flex flex-wrap gap-2">
      <span
        v-for="(item, index) in modelValue"
        :key="index"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
      >
        {{ item }}
        <button
          type="button"
          @click="removeItem(index)"
          class="ml-2 text-blue-600 hover:text-blue-800"
        >
          ×
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string[]
  placeholder?: string
  suggestions?: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const newItem = ref('')

const filteredSuggestions = computed(() => {
  if (!props.suggestions || !props.modelValue) return []
  return props.suggestions.filter(suggestion =>
    !props.modelValue.includes(suggestion)
  )
})

const addItem = () => {
  const trimmed = newItem.value.trim()
  if (trimmed && (!props.modelValue || !props.modelValue.includes(trimmed))) {
    const currentValue = props.modelValue || []
    emit('update:modelValue', [...currentValue, trimmed])
    newItem.value = ''
  }
}

const addSuggestion = (suggestion: string) => {
  if (!props.modelValue || !props.modelValue.includes(suggestion)) {
    const currentValue = props.modelValue || []
    emit('update:modelValue', [...currentValue, suggestion])
  }
}

const removeItem = (index: number) => {
  if (!props.modelValue) return
  const newArray = [...props.modelValue]
  newArray.splice(index, 1)
  emit('update:modelValue', newArray)
}
</script>
