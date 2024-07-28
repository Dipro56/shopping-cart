import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-slate-50 text-black rounded-lg shadow-xl flex flex-col justify-between p-2">
      <div className="w-full h-48 hover:cursor-pointer hover:scale-110 bg-slate-300 rounded-lg animate-pulse"></div>
      <div className="">
        <div className="h-6 w-10/12 rounded-lg bg-slate-300 animate-pulse my-3"></div>
        <div className="h-4 w-3/12 rounded-lg bg-slate-300 animate-pulse my-3"></div>
        <div className="h-4 w-7/12 rounded-lg bg-slate-300 animate-pulse my-3"></div>
        <div className="h-4 w-8/12 rounded-lg bg-slate-300 animate-pulse my-3"></div>

        <div className="h-4 w-9/12 rounded-lg bg-slate-300 animate-pulse my-3"></div>
        <div className="h-10 w-full rounded-lg bg-slate-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
