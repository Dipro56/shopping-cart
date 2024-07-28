import notifications from '@/lib/notification';
import { findCartItem, isStockAvailable } from './cartHelper';
import { AppDispatch } from '../../lib/store';

export const handleProductIncrement = (
  cartItems: CartItem[],
  productDetails: Product,
  quantity: number,
  setQuantity: (quantity: number) => void
) => {
  const cartItem = findCartItem(cartItems, productDetails.id);

  if (isStockAvailable(cartItem, quantity, productDetails.stock)) {
    setQuantity(quantity + 1);
  } else {
    notifications.error('Stock out!');
  }
};

export const handleProductDecrement = (
  quantity: number,
  setQuantity: (quantity: number) => void
) => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

export const handleProductAddToCart = (
  user: User | null,
  cartItems: CartItem[],
  productDetails: Product,
  quantity: number,
  discountedPrice: number,
  dispatch: AppDispatch,
  addToCart: (item: CartItem) => { type: string; payload: CartItem }
) => {
  if (user) {
    const cartItem = findCartItem(cartItems, productDetails.id);
    const isAvailable = isStockAvailable(
      cartItem,
      quantity,
      productDetails.stock
    );

    if (isAvailable || !cartItem) {
      dispatch(
        addToCart({
          id: productDetails.id,
          title: productDetails.title,
          price: discountedPrice,
          quantity,
          thumbnail: productDetails.thumbnail,
          userId: user.id,
          stock: productDetails.stock,
        })
      );
      notifications.success('Product added successfully');
    } else {
      notifications.error('Stock out!');
    }
  } else {
    notifications.error('Please login to add to cart');
  }
};
