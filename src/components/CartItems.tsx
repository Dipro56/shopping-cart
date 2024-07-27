'use client';
import { useUser } from '@/hooks/useUsers';
import notifications from '@/lib/notification';
import { getUserCartData } from '@/lib/slices/cartSlice';
import { RootState } from '@/lib/store';
import getStripe from '@/lib/stripe/stripe';
import { Button, Spinner } from '@radix-ui/themes';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
function CartItems() {
  // const stripe = useStripe();
  // const elements = useElements();
  // const [error, setError] = useState<string | null>(null);
  // const [processing, setProcessing] = useState(false);
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
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
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
                  <p className="text-gray-400 text-sm">
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
        <div className="bg-gray-700 p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Grand Total</p>
            <p className="text-2xl font-extrabold">${grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        {/* <h2 className="text-xl sm:text-2xl font-semibold mb-4">Payment Details</h2> */}
        {/* Add your payment form here */}
        <Button
          className="w-full cursor-pointer h-12 bg-indigo-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-indigo-500 transition-colors duration-300 ease-in-out mt-2"
          disabled={loading}
          onClick={handleCheckout}
          variant="classic"
        >
          <Spinner loading={loading}></Spinner>
          Place Order
        </Button>
        {/* className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-indigo-500 transition-colors duration-300 ease-in-out mt-6"
                    onClick={handleCheckout}
                >
                    Place Order
                </button> */}
      </div>
    </div>
  ) : (
    <div>
      <p className="text-xl text-center text-gray-400">Your cart is empty.</p>
    </div>
  );
}

export default CartItems;
