'use client';

import React from 'react';
import Header from './Header';
import ProductsHeading from '../products/ProductsHeading';
import { usePathname } from 'next/navigation';

// import { Theme } from '@radix-ui/themes'

const notHeaderRoute = [
  '/login',
  '/cart',
  '/checkout',
  '/success',
  '/canceled',
];
function MainLayout() {
  const pathname = usePathname();

  let component;
  if (notHeaderRoute?.includes(pathname)) {
    component = (
      <>
        <Header />
      </>
    );
  } else {
    component = (
      <>
        <Header />
        <ProductsHeading />
      </>
    );
  }
  return component;
}

export default MainLayout;
