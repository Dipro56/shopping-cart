"use client";
import { useUser } from "@/hooks/useUsers";
import {
  decrementQuantity,
  getUserCartData,
  incrementQuantity,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Button } from "@radix-ui/themes";
import CartTitle from "@/components/cart/CartTitle";
import CartTableHead from "@/components/cart/CartTableHead";
import CartTableBody from "@/components/cart/CartTableBody";
import CartTotalSection from "@/components/cart/CartTotalSection";

const cartTableHeadList = ["Image", "Quantity", "Product", "Total", "Delete"];

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
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-xl text-center text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                  <div className="p-4 sm:p-6">
                    <CartTitle title={"Your Cart"} />
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <CartTableHead cartTableHeadList={cartTableHeadList} />
                        <CartTableBody
                          cartItemList={cartItems}
                          handleIncrementQuantity={handleIncrementQuantity}
                          handleDecrementQuantity={handleDecrementQuantity}
                          handleRemoveItem={handleRemoveItem}
                        />
                      </table>
                    </div>
                  </div>
                  <CartTotalSection totalPrice={totalPrice.toFixed(2)} />
                </div>
              </div>
            </div>
            <Button
              className="w-full bg-blue-800 text-white rounded-lg px-2 py-5 hover:bg-blue-800 cursor-pointer"
              onClick={handleCheckout}
            >
              Procced to checkout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
