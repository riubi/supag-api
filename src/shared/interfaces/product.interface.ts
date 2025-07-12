import { IFilter } from './category.interface';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  category: { name: string; value: string };
  subcategory: { name: string; value: string };
  filters: IFilter[];
  measure: 'ml' | 'gr';
  specialConditions?: string;
  volume: number;
  exporter: { id: number; name: string };
  inStock: boolean;
  country: string;
  giftBox: boolean;
  region: string;
  certificates: string[];
  isManufacturer: boolean;
  manufacturer: string;
  brand: string;
  abv: number;
}
