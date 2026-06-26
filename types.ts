export type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  available: boolean;
  createdAt: string;
};

export type CartItem = {
  menu: MenuItem;
  quantity: number;
};

export type OrderItem = {
  id: number;
  menuId?: number;
  quantity: number;
  price: number;
  menuName: string;
};

export type Order = {
  id: number;
  customerName: string;
  tableNumber: string;
  status: string;
  total: number;
  notes: string | null;
  items: OrderItem[];
  createdAt: string;
};

export type CreateOrderPayload = {
  customerName: string;
  tableNumber: string;
  notes: string | null;
  orders: Record<number, number>;
};

export type CreateOrderResult = {
  orderId: number;
  totalPrice: number;
};

export type UpdateStatusPayload = {
  status: "pending" | "cooking" | "ready" | "served";
};

export type UpdateStatusResult = {
  id: number;
  status: string;
};
