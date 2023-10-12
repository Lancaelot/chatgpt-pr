'use client';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import React from 'react';

function Login() {
  return (
    <div className='container mx-auto flex h-screen w-full flex-col items-center justify-center space-y-10'>
      <Image width={300} height={300} src='/images/logo.png' alt='logo' />
      <button
        onClick={() => signIn('google')}
        className='text-3xs animate-pulse font-bold'
      >
        Sign in with google
      </button>
    </div>
  );
}

export default Login;
