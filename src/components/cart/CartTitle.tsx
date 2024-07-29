import React from "react";
interface CartTitleProps {
  title: String;
}

const CartTitle: React.FC<CartTitleProps> = ({ title }) => {
  return (
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
      {title}
    </h2>
  );
};

export default CartTitle;
