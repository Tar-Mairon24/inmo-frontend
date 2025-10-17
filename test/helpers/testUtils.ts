import { createPinia, setActivePinia } from 'pinia'
import { mount, VueWrapper } from '@vue/test-utils'
import type { ComponentMountingOptions } from '@vue/test-utils'

export function setupTestPinia() {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

export function createWrapper<T>(
  component: T,
  options: ComponentMountingOptions<any> = {}
): VueWrapper<any> {
  const pinia = setupTestPinia()

  return mount(component as any, {
    global: {
      plugins: [pinia],
      ...options.global
    },
    ...options
  })
}
