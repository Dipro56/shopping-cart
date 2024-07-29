"use client";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import { useSearchedProductsQuery } from "@/redux/api/search/searchApiSlice";
import { Grid } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import React from "react";

function Page() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("product_name") || "";
  const order = searchParams.get("order") || "";

  const {
    data: products,
    isLoading: isFetching,
    isError,
  } = useSearchedProductsQuery({
    query: productName,
    order: order,
  });

  if (isError) {
    return <p>There was an error fetching products.</p>;
  }

  return (
    <main className="min-h-screen px-0 xl:px-24">
      <Grid
        className="gap-2"
        columns={{ xs: "2", sm: "3", md: "5" }}
        gap="4"
        mt="5"
        rows="auto"
        width="auto"
      >
        {isFetching ? (
          <>
            {[...Array(15)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {products?.products?.length > 0 ? (
              products?.products.map((item: Product) => (
                <ProductCard key={item.id} product={item} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </>
        )}
      </Grid>
    </main>
  );
}

export default Page;
