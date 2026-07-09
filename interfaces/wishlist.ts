export interface WishlistRow {
  id: number;
  created_at: string;

  profiles: {
    full_name: string | null;
  }[];

  products: {
    title: string;
    price: number;
    thumbnail: string;
  }[];
}
export interface WishlistItem {
  id: number;
  user_name: string;
  title: string;
  price: number;
  thumbnail: string;
  created_at: string;
}

export interface WishlistGridProps {
  wishlist: WishlistItem[];
}