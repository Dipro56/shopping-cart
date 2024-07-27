// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    userId: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action: PayloadAction<CartItem>) => {

            const existingItem = state.items.find(item => item.id === action.payload.id && item.userId === action.payload.userId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('achcart', JSON.stringify(state.items));
        },

        incrementQuantity: (state, action: PayloadAction<{ productId: number; userId: number }>) => {
            const item = state.items.find(item => item.id === action.payload.productId && item.userId === action.payload.userId);
            if (item) {
                item.quantity += 1;
            }

            // Save to local storage
            localStorage.setItem('achcart', JSON.stringify(state.items));
        },
        decrementQuantity: (state, action: PayloadAction<{ productId: number; userId: number }>) => {
            const item = state.items.find(item => item.id === action.payload.productId && item.userId === action.payload.userId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }

            // Save to local storage
            localStorage.setItem('achcart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<{ productId: number; userId: number }>) => {
            state.items = state.items.filter(item => !(item.id === action.payload.productId && item.userId === action.payload.userId));

            // Save to local storage
            localStorage.setItem('achcart', JSON.stringify(state.items));
        },
        removeUserCartData: (state, action: PayloadAction<{ userId: number }>) => {
            state.items = state.items.filter(item => item.userId !== action.payload.userId);

            // Save to local storage
            localStorage.setItem('achcart', JSON.stringify(state.items));
        },

        getUserCartData: (state, action: PayloadAction<number>) => {
            const userId = action.payload;
            const storedCart = localStorage.getItem('achcart');
            if (storedCart) {
                const parsedCart: CartItem[] = JSON.parse(storedCart);
                state.items = parsedCart.filter(item => item.userId === userId);
            }
        },
    },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, getUserCartData, removeUserCartData } = cartSlice.actions;
export default cartSlice.reducer;