"use client";
import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

interface ProductReviewProps {
  review: Review;
}
const ProductReview: React.FC<ProductReviewProps> = ({ review }) => {
  return (
    <div className="my-1">
      <div className="flex justify-start sm:justify-between items-center">
        <div className="flex items-center">
          <FaUserCircle size={40} className="text-gray-600" />
          <div className="mx-2">
            <h1 className="font-semibold text-sm mb-0">
              {review?.reviewerName}
            </h1>
            <h1 className="text-xs text-gray-600">{review?.reviewerEmail}</h1>
          </div>
        </div>
        <div className="hidden sm:flex">
          {[...Array(review.rating)].map((_, i) => (
            <IoMdStar key={i} className={`h-5 w-5 text-yellow-400`} />
          ))}
        </div>
      </div>
      <h1 className="ml-12 text-sm">{review?.comment}</h1>
    </div>
  );
};

export default ProductReview;
