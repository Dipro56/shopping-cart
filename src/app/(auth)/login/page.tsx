'use client';
import { useRouter } from 'next/navigation';
import React, { startTransition, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Flex } from '@radix-ui/themes';
import { SiLootcrate } from 'react-icons/si';
import apiServices from '@/services/apiServices';
import notifications from '@/lib/notification';
import { setCookie } from 'typescript-cookie';
import { useUser } from '@/hooks/useUsers';
import useLoader from '@/hooks/useLoader';
import InputField from '@/components/utils/InputField';

function Login() {
  let { revalidate, user } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { isLoading, handleLoading } = useLoader();

  const handleLogin = async () => {
    if (username && password) {
      handleLoading();
      let res = await apiServices.login(username, password);
      if (res?.message === 'Invalid credentials') {
        notifications.error(res.message);
        handleLoading();
        return;
      } else {
        notifications.success('Logged in successfully');
        setCookie('sct', res?.token);
        setCookie('rsct', res?.refreshToken);
        revalidate();
        return;
      }
    } else {
      notifications.error('Fill all field');
    }
  };

  useEffect(() => {
    if (user) {
      handleLoading();
      startTransition(() => {
        router.push('/');
        router.refresh();
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col mt-20">
      <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-md bg-blue-600 py-10">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-blue-600">
        <div className=" p-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <InputField
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="User name"
            />
            <InputField
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />

            <div>
              <Button
                loading={isLoading}
                onClick={handleLogin}
                className="bg-yellow-600"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
