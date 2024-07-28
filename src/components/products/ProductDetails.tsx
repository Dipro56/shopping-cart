'use client';
import React, { useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { CiShoppingCart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { useUser } from '@/hooks/useUsers';

import {
  handleProductAddToCart,
  handleProductDecrement,
  handleProductIncrement,
} from '@/utils/helper/productHelper';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { RootState } from '../../redux/store';

interface ProductCardProps {
  productDetails: Product;
}

const ProductDetails: React.FC<ProductCardProps> = ({ productDetails }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);
  let { user } = useUser();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const discountedPrice =
    productDetails?.price * (1 - productDetails?.discountPercentage / 100);
  const totalPrice = discountedPrice * quantity;

  return (
    <div className="my-4 w-full">
      <h1 className="font-semibold text-base">{productDetails?.title}</h1>

      <div className="flex justify-between">
        <h1 className="text-xs font-semibold text-gray-500 ">
          {productDetails?.brand}
        </h1>
        <p className="text-xs text-gray-500  truncate">{productDetails.sku}</p>
      </div>

      <div className="flex gap-2 my-2">
        {productDetails?.tags?.map((item: String, index: number) => {
          return (
            <p
              className="py-1 px-3 bg-blue-300  text-blue-900 text-xs rounded-lg"
              key={index}
            >
              {item}
            </p>
          );
        })}
      </div>

      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <IoMdStar
            key={i}
            className={`h-5 w-5 ${
              i < Math.round(productDetails.rating)
                ? 'text-yellow-400'
                : 'text-gray-500'
            }`}
          />
        ))}
      </div>

      <p className="text-gray-600 text-xs my-3">
        {productDetails?.description}
      </p>

      <div className="my-1">
        <span className="text-2xl font-bold text-black">
          ${discountedPrice?.toFixed(2)}
        </span>
        {productDetails?.discountPercentage > 0 && (
          <span className="ml-2 text-lg text-gray-500 line-through">
            ${productDetails.price.toFixed(2)}
          </span>
        )}
      </div>
      <h1 className="text-sm font-semibold text-red-600">
        Total stock : {productDetails?.stock}
      </h1>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              handleProductDecrement(quantity, setQuantity);
            }}
            className="p-1 bg-blue-900 hover:bg-blue-700 text-white rounded-full  transition duration-200"
            aria-label="Decrement quantity"
          >
            <FiMinus />
          </button>
          <span className="text-base font-bold">{quantity}</span>
          <button
            onClick={() => {
              handleProductIncrement(
                cartItems,
                productDetails,
                quantity,
                setQuantity
              );
            }}
            className="p-1 my-3 bg-blue-900 hover:bg-blue-700 text-white rounded-full transition duration-200"
            aria-label="Increment quantity"
          >
            <FiPlus />
          </button>
        </div>
        <div>
          <span className="text-base font-bold text-black">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          handleProductAddToCart(
            user,
            cartItems,
            productDetails,
            quantity,
            discountedPrice,
            dispatch,
            addToCart
          );
        }}
        className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center"
      >
        <CiShoppingCart className="text-lg" />
        <span className="ml-1 text-sm"> Add to Cart</span>
      </button>
      <p className="text-xs text-blue-800 font-semibold my-1">
        {productDetails?.shippingInformation}
      </p>

      <p className="text-xs text-blue-800 font-semibold my-1">
        {productDetails?.returnPolicy}
      </p>
    </div>
  );
};

export default ProductDetails;
