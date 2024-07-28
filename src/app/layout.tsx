import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';
import MainLayout from '../components/layout/MainLayout';
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'react-hot-toast';
import { notificationOption } from '../lib/notification';
import StoreProvider from '@/redux/StoreProvider';
// import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});
export const metadata: Metadata = {
  title: 'Shop Cart',
  description: 'Shop Cart eommerce. Fill your need from us.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <StoreProvider>
          <Theme accentColor="indigo">
            <div className="bg-slate-100">
              <MainLayout />

              {children}
            </div>
          </Theme>
        </StoreProvider>

        <Toaster toastOptions={notificationOption} />
      </body>
    </html>
  );
}
