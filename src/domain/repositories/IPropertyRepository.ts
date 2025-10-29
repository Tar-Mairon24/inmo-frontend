import type { PropertyCard, PropertyDetail } from '@/domain/entities/Property'

export interface IPropertyRepository {
  getPropertyById(property_id: number): Promise<PropertyDetail | null>
  getAllProperties(): Promise<PropertyCard[]>
  createProperty(property: PropertyDetail): Promise<PropertyDetail>
  updateProperty(property_id: number, property: PropertyDetail): Promise<PropertyDetail | null>
  deleteProperty(property_id: number): Promise<boolean>
}
