import type { PropertyDetail } from '@/domain/entities/Property'
import type { IPropertyRepository } from '@/domain/repositories/IPropertyRepository'

export class PropertyService {
  constructor(private propertyRepository: IPropertyRepository) {}

  async getPropertyById(property_id: number) {
    return this.propertyRepository.getPropertyById(property_id)
  }

  async getAllProperties() {
    return this.propertyRepository.getAllProperties()
  }

  async createProperty(propertyData: PropertyDetail): Promise<PropertyDetail> {
    return this.propertyRepository.createProperty(propertyData)
  }

  async updateProperty(propertyId: number, propertyData: PropertyDetail): Promise<PropertyDetail | null> {
    return this.propertyRepository.updateProperty(propertyId, propertyData)
  }

  async deleteProperty(property_id: number) {
    return this.propertyRepository.deleteProperty(property_id)
  }
}
