import React from "react";

interface CartTotalSectionProps {
  totalPrice: string;
}

const CartTotalSection: React.FC<CartTotalSectionProps> = ({ totalPrice }) => {
  return (
    <div className="bg-white p-4 sm:p-6">
      <hr />
      <div className="flex justify-between items-center px-6 my-6">
        <p className="text-xl font-bold">Grand Total</p>
        <p className="text-2xl font-extrabold px-6">${totalPrice}</p>
      </div>
    </div>
  );
};

export default CartTotalSection;
