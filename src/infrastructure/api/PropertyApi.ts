import { BaseApi } from './BaseApi'
import type { PropertyCard, PropertyDetail } from '@/domain/entities/Property'

export class PropertyApi extends BaseApi {
  async getPropertyById(property_id: number): Promise<PropertyDetail | null> {
    return this.request<PropertyDetail>(`/properties/${property_id}`, {
      method: 'GET',
    })
  }

  async getAllProperties(): Promise<PropertyCard[]> {
    return this.request<PropertyCard[]>(`/properties`, {
      method: 'GET',
    })
  }

  async deleteProperty(property_id: number): Promise<boolean> {
    try {
      await this.request<void>(`/properties/${property_id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting property:', error)
      return false
    }
  }
}
