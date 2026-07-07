export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  created_at: string;
}

export interface productCardProps {
  product: Product;
}
export interface productGridProps {
  products: Product[];
}