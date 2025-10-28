import type { IPropertyRepository } from '@/domain/repositories/IPropertyRepository'
import { PropertyApi } from '../api/PropertyApi'
import type { PropertyCard, PropertyDetail } from '@/domain/entities/Property'

export class PropertyRepository implements IPropertyRepository {
  constructor(private api: PropertyApi) {}

  async getPropertyById(property_id: number): Promise<PropertyDetail | null> {
    try {
      const property = await this.api.getPropertyById(property_id)
      return property
    } catch (error) {
      console.error('Failed to fetch property by ID:', error)
      throw new Error('Failed to fetch property by ID: ' + (error as Error).message)
    }
  }

  async getAllProperties(): Promise<PropertyCard[]> {
    try {
      const properties = await this.api.getAllProperties()
      return properties
    } catch (error) {
      console.error('Failed to fetch all properties:', error)
      throw new Error('Failed to fetch all properties: ' + (error as Error).message)
    }
  }

  async deleteProperty(property_id: number): Promise<boolean> {
    try {
      const result = await this.api.deleteProperty(property_id)
      return result
    } catch (error) {
      console.error('Failed to delete property:', error)
      throw new Error('Failed to delete property: ' + (error as Error).message)
    }
  }
}
