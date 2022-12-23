import { Category } from './category.interface';

export interface Product {
  name: string;
  description: string;
  richDescription?: string;
  imageUrl: string;
  imageUrls?: string[];
  brand: string;
  price: number;
  category: Category;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: Date;
  _id?: string;
}
