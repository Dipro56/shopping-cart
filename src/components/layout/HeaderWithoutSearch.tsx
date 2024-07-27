"use client"
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, TextField } from '@radix-ui/themes'

import React, { useEffect, useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { SiLootcrate } from "react-icons/si";

import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/hooks/useUsers';
import Image from 'next/image';
import UserDropdown from './UserDropdown';



function Header() {
    let { user } = useUser()

    let router = useRouter();


    return (
        <Flex justify={"between"}>
            <Flex align={"center"}>
                <SiLootcrate className='text-4xl font-bold' />
                <h1 className='font-bold text-base hidden sm:block'>AchCom</h1>
            </Flex>

            <Flex gap={"3"} align={"center"}>


                {
                    user ? <UserDropdown>
                        <Image src={user?.image} alt='user' width={40} height={40} className="rounded-[50%]" />
                    </UserDropdown> :
                        <Button radius="full" onClick={() => {
                            router.push('/login')
                        }} variant="soft" className='cursor-pointer'>
                            Login
                        </Button>
                }
            </Flex>


        </Flex>
    )
}

export default Header