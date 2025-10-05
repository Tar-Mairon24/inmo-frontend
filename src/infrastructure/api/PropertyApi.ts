import { BaseApi } from './BaseApi';
import type { PropertyCard, PropertyDetail } from '@/domain/entities/Property';

export class PropertyApi extends BaseApi {
  async getPropertyById(property_id: number): Promise<PropertyDetail | null> {
    return this.request<PropertyDetail>(`/properties/${property_id}`, {
      method: 'GET'
    });
  }

  async getAllProperties(): Promise<PropertyCard[]> {
    return this.request<PropertyCard[]>(`/properties`, {
      method: 'GET'
    });
  }
}
