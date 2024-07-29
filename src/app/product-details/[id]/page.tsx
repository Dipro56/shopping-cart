import productService from "@/services/productService";
import Image from "next/image";
import React from "react";
import { IoMdStar } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import ProductDetails from "@/components/products/ProductDetails";
import ProductReview from "@/components/products/ProductReview";


interface Context {
  params: any;
  id: number;
}

const getSingleProductDetails = async (context: Context) => {
  let porductId = context?.params?.id;
  let result = await productService.singleProductDetails(porductId);
  return { productDetails: result };
};

const ProductDetailsPage = async (param: Context) => {
  let { productDetails } = await getSingleProductDetails(param);

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
                <ProductReview review ={item}/>
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
