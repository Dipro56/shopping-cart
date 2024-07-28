'use client';
import { useUser } from '@/hooks/useUsers';
import {
  decrementQuantity,
  getUserCartData,
  incrementQuantity,
  removeFromCart,
} from '@/redux/features/cart/cartSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


function Page() {
  const router = useRouter();
  let { user } = useUser();
  const dispatch = useDispatch();
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
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center">
          Your Cart
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-xl text-center text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-3 px-4 text-left text-blue-900">Image</th>
                    <th className="py-3 px-4 text-left text-blue-900">
                      Product
                    </th>
                    <th className="py-3 px-4 text-left text-blue-900">Price</th>
                    <th className="py-3 px-4 text-left text-blue-900">
                      Quantity
                    </th>
                    <th className="py-3 px-4 text-left text-blue-900">Total</th>
                    <th className="py-3 px-4 text-left text-blue-900">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-4 px-4">
                        <Image
                          src={item?.thumbnail}
                          height={80}
                          width={80}
                          alt={'product image'}
                          className="rounded-lg"
                        />
                      </td>
                      <td className="py-4 px-4 text-gray-900">{item.title}</td>
                      <td className="py-4 px-4 text-gray-600">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleDecrementQuantity(item.id, item.userId)
                            }
                            className="bg-blue-900 text-white rounded-full p-1 hover:bg-blue-800"
                          >
                            <FiMinus />
                          </button>
                          <span className="text-lg font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrementQuantity(item.id, item.userId)
                            }
                            className="bg-blue-900 text-white rounded-full p-1 hover:bg-blue-800"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleRemoveItem(item.id, item.userId)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 sm:mt-12 bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <p className="text-xl sm:text-2xl font-bold">Total</p>
                <p className="text-2xl sm:text-3xl font-extrabold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 ease-in-out"
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
