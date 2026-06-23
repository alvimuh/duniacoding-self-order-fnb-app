export type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  available: boolean;
};

export type CartItem = {
  menu: MenuItem;
  quantity: number;
};
