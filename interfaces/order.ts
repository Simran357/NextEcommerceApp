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