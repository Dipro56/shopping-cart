export const findCartItem = (
  cartItems: CartItem[],
  productId: number
): CartItem | any => {
  return cartItems.find((item: CartItem) => item?.id === productId);
};

export const isStockAvailable = (
  cartItem: CartItem,
  quantity: number,
  stock: number
) => {
  return cartItem ? cartItem?.quantity + quantity <= stock : quantity < stock;
};
