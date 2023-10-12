import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <ExclamationCircleIcon className='drop-shadow-glow animate-flicker h-20 w-20 text-red-500' />
          <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>

          <a href='/'>Back home</a>
        </div>
      </section>
    </main>
  );
}
