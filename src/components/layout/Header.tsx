'use client';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, TextField } from '@radix-ui/themes';

import React, { useEffect, useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/hooks/useUsers';
import Image from 'next/image';
import UserDropdown from './UserDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useThrottle } from '@/hooks/useThrottle'

import Link from 'next/link';
import { getUserCartData } from '@/redux/features/cart/cartSlice';
import { RootState } from '../../redux/store';

const notHeaderRoute = [
  '/login',
  '/cart',
  '/checkout',
  '/success',
  '/canceled',
];

function Header() {
  let { user } = useUser();
  let router = useRouter();
  const searchParams = useSearchParams();
  const order = searchParams.get('order');
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getUserCartData(user.id));
    }
  }, [dispatch, user]);

  const throttledSearch = useThrottle((query: string) => {
    const url = order
      ? `/search?product_name=${query}&order=${order}`
      : `/search?product_name=${query}`;
    router.push(url);
  }, 300);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
    throttledSearch(query);
  };

  return (
    <Flex className="bg-slate-100 shadow-md px-1 lg:px-6" justify={'between'}>
      <Flex align={'center'}>
        <Link href={'/'}>
          <Image
            className=" cursor-pointer"
            height={80}
            width={80}
            src={'/logo/shop_cart.png'}
            alt="logo"
          />
        </Link>
      </Flex>

      <Flex gap={'3'} align={'center'}>
        {notHeaderRoute?.includes(pathname) ? (
          <></>
        ) : (
          <>
            <Box maxWidth="250px">
              <TextField.Root
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search "
                size="2"
              >
                <TextField.Slot></TextField.Slot>
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <div
              className="relative cursor-pointer"
              onClick={() => {
                router.push('/cart');
              }}
            >
              <div
                className={`bg-blue-800 rounded-full py-1 px-2 absolute top-[-12px] left-[12px] text-xs font-semibold text-white`}
              >
                {cartItems.length}
              </div>
              <CiShoppingCart className="text-2xl" />
            </div>
          </>
        )}

        {user?.image ? (
          <UserDropdown>
            <Image
              src={user?.image}
              alt="user"
              width={40}
              height={40}
              className="rounded-[50%]"
            />
          </UserDropdown>
        ) : (
          <Button
            radius="full"
            onClick={() => {
              router.push('/login');
            }}
            variant="soft"
            className="cursor-pointer"
          >
            Login
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
