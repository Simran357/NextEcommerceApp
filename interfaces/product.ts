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

// ================= AUTH =================

export interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => void;
  changeForm: () => void;
}

export interface NavbarModalProps {
  setShowLogin: (value: boolean) => void;
  setShowSignup: (value: boolean) => void;
}

// ================= CART =================

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// ================= PROFILE =================

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

export interface FilterContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

  brand: string;
  setBrand: React.Dispatch<React.SetStateAction<string>>;

  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;

  stock: string;
  setStock: React.Dispatch<React.SetStateAction<string>>;

  discount: number;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;

  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;

  minPrice: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;

  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;

  resetFilters: () => void;
}


export interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export interface ProductDetailsModalProps {
  open: boolean;
  productId: number | null;
  onClose: () => void;
}