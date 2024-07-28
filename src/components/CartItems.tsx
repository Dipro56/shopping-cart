'use client';
import { useUser } from '@/hooks/useUsers';
import notifications from '@/lib/notification';
import getStripe from '@/lib/stripe/stripe';
import { getUserCartData } from '@/redux/features/cart/cartSlice';
import { Button, Spinner } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function CartItems() {
  let { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id) {
      dispatch(getUserCartData(user.id));
    }
  }, [dispatch, user]);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [...cartItems],
      }),
    });
    const session = await response.json();

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      notifications.error(error);
    }

    setLoading(false);
  };
  return cartItems?.length > 0 ? (
    <div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-700 pb-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-black text-sm">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <p className="text-lg font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Grand Total</p>
            <p className="text-2xl font-extrabold">${grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <Button
        className="w-full bg-blue-900 text-white rounded-lg p-2 hover:bg-blue-800"
        disabled={loading}
        onClick={handleCheckout}
      >
        <Spinner loading={loading}></Spinner>
        Place Order
      </Button>
    </div>
  ) : (
    <div>
      <p className="text-xl text-center text-gray-400">Your cart is empty.</p>
    </div>
  );
}

export default CartItems;
