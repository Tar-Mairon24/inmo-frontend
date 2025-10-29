import type { User } from './user'

export interface PropertyCard {
  id: number
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  construction_m2: number
  city: string
  neighborhood: string
  property_type: property_type
  transaction_type: transaction_type
  status: property_status
  created_at: string
}

export interface PropertyDetail {
  id?: number
  title: string
  address: string
  neighborhood?: string
  city: string
  zone?: string
  reference?: string
  price: number
  construction_m2?: number
  land_m2?: number
  isOccupied?: boolean
  isFurnished?: boolean // Fixed typo from "isFuirnished"
  floors?: number
  bedrooms?: number
  bathrooms?: number
  garage_size?: number
  garden_m2?: number
  gas_type?: string[] // Changed from gas_types to match backend
  amenities?: string[]
  extras?: string[]
  utilities?: string[]
  notes?: string
  property_type: property_type
  transaction_type: transaction_type
  status?: property_status
  created_at?: string
  updated_at?: string
  agent?: User
  owner_id?: number
  user_id?: number
}

export type property_type =
  | 'house'
  | 'apartment'
  | 'land'
  | 'commercial'
  | 'storehouse'
  | 'office'
  | 'industrial'
  | 'other'

export type transaction_type = 'sale' | 'rental' // Fixed: backend uses 'rental' not 'rent'

export type property_status = 'available' | 'sold' | 'rented' | 'reserved'
