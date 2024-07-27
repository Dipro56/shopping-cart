'use client';
import { useUser } from '@/hooks/useUsers';
import {
  decrementQuantity,
  getUserCartData,
  incrementQuantity,
  removeFromCart,
} from '@/lib/slices/cartSlice';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

function Page() {
  const router = useRouter();

  let { user } = useUser();
  const dispatch = useDispatch();
  // Assuming you have a user state
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getUserCartData(user.id));
    }
  }, [dispatch, user]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (productId: number, userId: number) => {
    dispatch(removeFromCart({ productId, userId }));
  };

  const handleIncrementQuantity = (productId: number, userId: number) => {
    dispatch(incrementQuantity({ productId, userId }));
  };

  const handleDecrementQuantity = (productId: number, userId: number) => {
    dispatch(decrementQuantity({ productId, userId }));
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center">
          Your Cart
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-xl text-center text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="space-y-4 sm:space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="flex-1 mb-4 sm:mb-0">
                      <h2 className="text-lg sm:text-xl font-semibold text-black">
                        {item.title}
                      </h2>
                      <p className="text-gray-400 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleDecrementQuantity(item.id, item?.userId)
                          }
                          className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                        >
                          <FiMinus />
                        </button>
                        <span className="text-lg font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleIncrementQuantity(item.id, item?.userId)
                          }
                          className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <p className="font-semibold text-lg w-24 text-left sm:text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.userId)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 sm:mt-12 bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <p className="text-xl sm:text-2xl font-bold">Total</p>
                <p className="text-2xl sm:text-3xl font-extrabold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-black py-3 px-4 rounded-lg text-lg font-semibold hover:bg-indigo-500 transition-colors duration-300 ease-in-out"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
