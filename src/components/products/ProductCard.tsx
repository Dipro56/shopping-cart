'use client';
import { useUser } from '@/hooks/useUsers';
import notifications from '@/lib/notification';
import { addToCart } from '@/lib/slices/cartSlice';
import { AppDispatch } from '@/lib/store';
import Image from 'next/image';
import React, { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { CiShoppingCart } from 'react-icons/ci';
import { IoMdStar } from 'react-icons/io';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  let { user } = useUser();

  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const totalPrice = discountedPrice * quantity;

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (user) {
      console.log('Adding to cart:', {
        id: product.id,
        title: product.title,
        price: discountedPrice,
        quantity: quantity,
        userId: user.id,
      });

      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: discountedPrice,
          quantity: quantity,
          userId: user.id,
        })
      );

      notifications.success('Product added successfully');
    } else {
      notifications.error('Please login to add to cart');
    }
    console.log(`Added ${quantity} of ${product.title} to cart.`);
  };
  return (
    <div className="bg-slate-50 text-black rounded-lg shadow-xl overflow-hidden transform  transition-transform duration-200 flex flex-col justify-between p-2">
      <Link href={`product-details/${product?.id}`}>
        <div className="relative w-full h-48 hover:cursor-pointer hover:scale-110 bg-slate-300 rounded-lg">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={product.thumbnail}
            alt={product.title}
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              {product.discountPercentage.toFixed(0)}% OFF
            </div>
          )}
        </div>
      </Link>
      <div className="p-1">
        <h3 className="text-base font-semibold truncate mt-2">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600  truncate">{product.brand}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <IoMdStar
              key={i}
              className={`h-5 w-5 ${
                i < Math.round(product.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-500'
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-400">
            ({product.rating.toFixed(1)})
          </span>
        </div>
        <h1 className="text-xs  text-red-600">
          Minimum order : {product?.minimumOrderQuantity}
        </h1>
        <p className="text-xs text-blue-800 my-1  truncate">
          Total reviews {product?.reviews?.length}
        </p>
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-base font-bold text-black">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <span
            className={`text-sm font-semibold ${
              product.stock <= 5 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {product.availabilityStatus}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={decrementQuantity}
              className="p-1 bg-blue-900 hover:bg-blue-700 text-white rounded-full  transition duration-200"
              aria-label="Decrement quantity"
            >
              <FiMinus />
            </button>
            <span className="text-base font-bold">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="p-1 bg-blue-900 hover:bg-blue-700 text-white rounded-full transition duration-200"
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
          onClick={handleAddToCart}
          className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center"
        >
          <CiShoppingCart className="text-lg" />
          <span className="ml-1 text-sm"> Add to Cart</span>
        </button>
      </div>
      {/* <div className="px-4 py-2 bg-gray-700">
                <p className="text-sm text-gray-300 truncate">{product.description}</p>
            </div> */}
    </div>
  );
};

export default ProductCard;
