// ================= PRODUCT =================

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

export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  products: Product[];
}

// ================= FILTER =================

export interface ProductFilterProps {
  category: string;
  setCategory: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

// ================= CART =================

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// ================= AUTH =================

export interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => void;
  changeForm: () => void;
}

// ================= NAVBAR =================

export interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;

  setShowLogin: (value: boolean) => void;
  setShowSignup: (value: boolean) => void;
}

// ================= PROFILE =================

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}