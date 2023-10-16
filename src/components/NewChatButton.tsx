'use client';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

import { addChat } from '@/utils/firebase';

const NewChatButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const createChat = async () => {
    if (session?.user?.email) {
      const chat = await addChat(session?.user?.email ?? '');

      router.push(`/chat/${chat.id}`);
    }
  };
  return (
    <div
      onClick={createChat}
      className='flex cursor-pointer items-center space-x-3 rounded-md border border-gray-500 p-2 text-sm text-white'
    >
      <PlusIcon className='h-4 w-4 shrink-0' />
      <p className='whitespace-nowrap'>New Chat</p>
    </div>
  );
};

export default NewChatButton;
