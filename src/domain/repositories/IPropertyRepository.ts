import type { PropertyCard, PropertyDetail } from '@/domain/entities/Property'

export interface IPropertyRepository {
  getPropertyById(property_id: number): Promise<PropertyDetail | null>
  getAllProperties(): Promise<PropertyCard[]>
  deleteProperty(property_id: number): Promise<boolean>
}
