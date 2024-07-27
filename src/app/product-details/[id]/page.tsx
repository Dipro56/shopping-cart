import productService from '@/services/productService';
import Image from 'next/image';
import React  from 'react';
import { IoMdStar } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import ProductDetails from '@/components/products/ProductDetails';

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

const ProductDetailsPage = async (param: Context) => {
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
          <ProductDetails productDetails={productDetails} />
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

export default ProductDetailsPage;
