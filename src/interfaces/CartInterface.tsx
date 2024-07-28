interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  userId: number;
  thumbnail: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
}
