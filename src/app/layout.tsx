import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import * as React from 'react';

import '@/styles/globals.css';

import ClientProvider from '@/components/ClientProvider';
import Login from '@/components/Login';
import SideBar from '@/components/SideBar';

import { siteConfig } from '@/constant/config';
import NextAuthSessionProvider from '@/providers/nextAuthSessionProvider';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html>
      <body>
        <NextAuthSessionProvider>
          {!session ? (
            <Login />
          ) : (
            <div className='flex h-screen w-full overflow-hidden'>
              <SideBar />
              <ClientProvider />
              <div className='bg-gray flex-1'>{children}</div>
            </div>
          )}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
