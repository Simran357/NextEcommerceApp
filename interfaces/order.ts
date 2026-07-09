export interface Order {
  id: number;
  order_id: string;
  product_id: number;
  title: string;
  thumbnail: string;
  quantity: number;
  price: number;
  status: string;
  created_at: string;
    user_name: string;
  total: number;
}
export interface OrderItem {
  product_id: number;
  title: string;
  thumbnail: string;
  quantity: number;
  price: number;
}

export interface GroupedOrder {
  order_id: string;
  created_at: string;
  status: string;
  items: Order[];
}



export interface OrderGridProps {
  orders: Order[];
}

export interface OrderRow {
  id: number;
  order_id: string;
  price: number;
  quantity: number;
  status: string;
  created_at: string;
  profiles: {
    full_name: string | null;
  } | null;
}

export interface AdminOrder {
  id: number;
  order_id: string;
  user_name: string;
  total: number;
  status: string;
  created_at: string;
}

export interface OrderGrid {
  orders: AdminOrder[];
}