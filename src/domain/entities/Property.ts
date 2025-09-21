import type { User } from "./user"

export interface PropertyCard {
  id: number
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  construction_m2: number
  city: string
  neighborhood: string
  property_type: string
  transaction_type: string
  status: string
  created_at: string
}

export interface propertyDetail {
  id: number
  title: string
  address: string
  neighborhood: string
  city: string
  zone: string
  price: number
  construction_m2: number
  land_m2: number
  isOccupied: boolean
  isFuirnished: boolean
  floors: number
  bedrooms: number
  bathrooms: number
  garage_size: number
  garden_m2: number
  gas_type: string[]
  amenities: string[]
  extras: string[]
  utilities: string[]
  property_type: property_type
  transaction_type: transaction_type
  status: property_status
  created_at: string
  updated_at: string
  agent: User
}

export type property_type =
  "house" |
  "apartment" |
  "land" |
  "commercial" |
  "storehouse" |
  "office" |
  "industrial" |
  "other"

export type transaction_type =
  "sale" |
  "rent"

export type property_status =
  "available" |
  "sold" |
  "rented" |
  "reserved"
