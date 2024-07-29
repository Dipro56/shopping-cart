"use client";
import { useUser } from "@/hooks/useUsers";
import getStripe from "@/lib/stripe/stripe";
import { getUserCartData } from "@/redux/features/cart/cartSlice";
import { Button, Spinner } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLoader from "@/hooks/useLoader";
import notifications from "@/lib/notification";
import { RootState } from "../../../redux/store";
import Image from "next/image";
import CartTitle from "@/components/cart/CartTitle";
import CartTableHead from "@/components/cart/CartTableHead";
import CartTableBody from "@/components/cart/CartTableBody";
import CartTotalSection from "@/components/cart/CartTotalSection";

const checkoutTableHeadList = ["Image", "Item", "Total"];

function Page() {
  let { user } = useUser();
  const dispatch = useDispatch();
  const { isLoading, handleStartLoading, handleStopLoading } = useLoader();

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

  const handlePlaceOrder = async () => {
    handleStartLoading();
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

    handleStopLoading();
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {cartItems?.length > 0 ? (
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="p-4 sm:p-6">
                <CartTitle title={"Order Summary"} />
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <CartTableHead cartTableHeadList={checkoutTableHeadList} />
                    <CartTableBody cartItemList={cartItems} />
                  </table>
                </div>
              </div>
              <CartTotalSection totalPrice={grandTotal.toFixed(2)} />
            </div>

            <Button
              className="w-full bg-blue-800 text-white rounded-lg px-2 py-5 hover:bg-blue-800 cursor-pointer"
              disabled={isLoading}
              onClick={handlePlaceOrder}
            >
              <Spinner loading={isLoading} />
              Place Order
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-xl text-center text-gray-400">
              Your cart is empty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
