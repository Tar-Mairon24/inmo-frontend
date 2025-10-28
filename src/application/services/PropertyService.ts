import type { IPropertyRepository } from '@/domain/repositories/IPropertyRepository'

export class PropertyService {
  constructor(private propertyRepository: IPropertyRepository) {}

  async getPropertyById(property_id: number) {
    return this.propertyRepository.getPropertyById(property_id)
  }

  async getAllProperties() {
    return this.propertyRepository.getAllProperties()
  }

  async deleteProperty(property_id: number) {
    return this.propertyRepository.deleteProperty(property_id)
  }
}
