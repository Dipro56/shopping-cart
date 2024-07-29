import React from "react";
interface CartTableHeadProps {
  cartTableHeadList: String[];
}

const CartTableHead: React.FC<CartTableHeadProps> = ({ cartTableHeadList }) => {
  return (
    <thead>
      <tr className="border-b border-gray-300">
        {cartTableHeadList?.map((item, index) => {
          return (
            <th key={index} className="py-3 px-4 text-left text-blue-900">
              {item}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default CartTableHead;
