<template>
  <div class="flex h-screen flex-col justify-between border-e border-gray-100 bg-white shadow-lg">
    <div class="px-4 py-6">
      <div class="flex items-center justify-between mb-6 gap-4">
        <div>
          <span
            class="grid h-10 w-28 md:h-12 md:w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
          >
            <img
              src="@/assets/images/MT_Logo.jpg"
              alt="Logo"
              class="h-8 w-24 md:h-10 md:w-28 object-contain"
            />
          </span>
        </div>
        <button @click="$emit('close')" class="p-1 rounded-md hover:bg-gray-100">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <ul class="mt-6 space-y-1">
        <li>
          <router-link
            to="/dashboard"
            @click="$emit('close')"
            class="block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            :class="
              $route.path === '/dashboard'
                ? 'bg-gray-100 text-gray-700'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            "
          >
            Dashboard
          </router-link>
        </li>

        <li>
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="text-sm font-medium"> Properties </span>

              <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <li>
                <router-link
                  to="/properties"
                  @click="$emit('close')"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  All Properties
                </router-link>
              </li>

              <li>
                <router-link
                  to="/properties/new"
                  @click="$emit('close')"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Add Property
                </router-link>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <router-link
            to="/billing"
            @click="$emit('close')"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Billing
          </router-link>
        </li>

        <li>
          <router-link
            to="/invoices"
            @click="$emit('close')"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Invoices
          </router-link>
        </li>

        <li>
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="text-sm font-medium"> Account </span>

              <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <li>
                <router-link
                  to="/account/details"
                  @click="$emit('close')"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Details
                </router-link>
              </li>

              <li>
                <router-link
                  to="/account/security"
                  @click="$emit('close')"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Security
                </router-link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <div class="flex items-center justify-between gap-2 bg-white p-4">
        <div class="flex-1">
          <p class="text-xs">
            <strong class="block font-medium">{{ user?.username || 'User' }}</strong>
            <span>{{ user?.email || 'user@example.com' }}</span>
          </p>
        </div>

        <button
          @click="requestLogout"
          class="flex-shrink-0 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 flex items-center justify-center"
          title="Cerrar sesión"
        >
          <img :src="logoutIcon" alt="logout" class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed} from 'vue'
import { useAuthStore } from '@/presentation/stores/authStore'
import logoutIcon from '@/assets/icons/logout-icon.png'

const emit = defineEmits<{
  close: []
  'logout-request': []
}>()

const authStore = useAuthStore()

const user = computed(() => authStore.AuthResponse?.data)

const requestLogout = () => {
  emit('logout-request')
}


</script>
