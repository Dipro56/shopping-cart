'use client';
import ProductCard from '@/components/products/ProductCard';
import { debounce } from '@/configs/globalFunctions';
import { useThrottle } from '@/hooks/useThrottle';
import apiServices from '@/services/apiServices';
import { Grid } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
  const searchParams = useSearchParams();
  const productName = searchParams.get('product_name');
  const order = searchParams.get('order');

  const [products, setProducts] = useState<Product[]>([]);

  let getSearchedProduct = async () => {
    let res = await apiServices.searchedProducts(productName, order);
    if (res?.products?.length > 0) {
      setProducts(res.products);
    } else {
      setProducts([]);
    }
  };

  const throttledSearchAPI = useThrottle(getSearchedProduct, 500);

  useEffect(() => {
    throttledSearchAPI();
  }, [productName, order]);

  return (
    <main className="min-h-screen px-0 xl:px-24">
      <Grid
        columns={{ xs: '2', sm: '3', md: '5' }}
        px="6"
        gap="5"
        mt="5"
        rows="auto"
        width="auto"
      >
        {products?.length > 0 ? (
          products.map((item) => <ProductCard key={item.id} product={item} />)
        ) : (
          <p>No products found.</p>
        )}
      </Grid>
    </main>
  );
}

export default Page;
