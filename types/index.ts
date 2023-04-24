export interface IServiceDefault {
  id?: number;
  property_type?: string;
  description?: string;
  address?: string[];
  created_at?: Date|string;
  updated_at?: Date|string;
  media?: string[];
  city?: string;
  country?: string;
  price?: number;
  availability?: boolean;
  verified?: boolean;
  owner_id?: number;
  size?: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  rating_id?: number;
  reviews?: string[];
  bookings?: number[];
  listed_by?: number;
  tags?: string[];
}