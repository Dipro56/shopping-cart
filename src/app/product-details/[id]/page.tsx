import productService from '@/services/productService';
import Image from 'next/image';
import React from 'react';
import { IoMdStar } from 'react-icons/io';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { CiShoppingCart } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';

// Define the type for the context parameter in getSingleProductDetails
interface Context {
  params: any;
  id: string;
}

// Define the type for the props of the component
interface ProductDetailsProps {
  id: string;
}

// Your async function to fetch data based on context
const getSingleProductDetails = async (context: Context) => {
  let porductId = context?.params?.id;
  let result = await productService.singleProductDetails(porductId);
  return { productDetails: result };
};

const ProductDetails = async (param: Context) => {
  let { productDetails } = await getSingleProductDetails(param);
  const discountedPrice =
    productDetails?.price * (1 - productDetails?.discountPercentage / 100);
  const totalPrice = discountedPrice * productDetails?.quantity;
  return (
    <main>
      <hr />
      <div className="w-full px-4 lg:px-16 py-6">
        <div className="flex flex-col lg:flex-row gap-3 xl:gap-10">
          <div className="flex justify-center bg-white my-4 w-full rounded-lg shadow-lg">
            <Image
              src={productDetails?.thumbnail}
              height={500}
              width={500}
              alt="product-image"
            />
          </div>
          <div className="my-4 w-full">
            <h1 className="font-semibold text-base">{productDetails?.title}</h1>

            <div className="flex justify-between">
              <h1 className="text-xs font-semibold text-gray-500 ">
                {productDetails?.brand}
              </h1>
              <p className="text-xs text-gray-500  truncate">
                {productDetails.sku}
              </p>
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
              Minimum order : {productDetails?.minimumOrderQuantity}
            </h1>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <button
                  // onClick={decrementQuantity}
                  className="p-1 bg-blue-900 hover:bg-blue-700 text-white rounded-full  transition duration-200"
                  aria-label="Decrement quantity"
                >
                  <FiMinus />
                </button>
                <span className="text-base font-bold">1</span>
                {/* <span className="text-base font-bold">{quantity}</span> */}
                <button
                  // onClick={incrementQuantity}
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
              // onClick={handleAddToCart}
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
        </div>
        {productDetails?.reviews ? (
          <div className="w-full xl:w-1/2 ">
            <h1 className="font-bold mb-4">Reviews</h1>
            {productDetails?.reviews?.map((item: Review) => {
              return (
                <>
                  <div className="my-1">
                    <div className="flex justify-start sm:justify-between items-center">
                      <div className="flex items-center">
                        <FaUserCircle size={40} className="text-gray-600" />
                        <div className="mx-2">
                          <h1 className="font-semibold text-sm mb-0">
                            {item?.reviewerName}
                          </h1>
                          <h1 className="text-xs text-gray-600">
                            {item?.reviewerEmail}
                          </h1>
                        </div>
                      </div>
                      <div className="hidden sm:flex">
                        {[...Array(item.rating)].map((_, i) => (
                          <IoMdStar
                            key={i}
                            className={`h-5 w-5 text-yellow-400`}
                          />
                        ))}
                      </div>
                    </div>
                    <h1 className="ml-12 text-sm">{item?.comment}</h1>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default ProductDetails;
