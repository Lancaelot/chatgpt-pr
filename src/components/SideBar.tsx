'use client';
import { collection, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import NewChatButton from './buttons/NewChatButton';
import ChatRow from './ChatRow';
import { db } from '../../firebase';
import ModelSelection from './ModelSelection';

const SideBar = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email ?? '', 'chats'),
        orderBy('createdAt', 'desc')
      )
  );

  return (
    <div className='min-w-md flex h-screen w-full flex-col overflow-y-auto bg-[#202123] p-4 md:max-w-[20rem]'>
      <div className='flex-1'>
        <div className='space-y-2'>
          <div className='mb-4'>
            <NewChatButton />
          </div>
          <div>
            <ModelSelection />
          </div>
          {loading && (
            <div className='text-gray-light animate-pulse text-center'>
              Loading chats...
            </div>
          )}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
      {session && (
        <div
          className='hover:bg-gray-light flex cursor-pointer items-center justify-start space-x-4 rounded-lg p-2'
          onClick={() => signOut()}
        >
          <Image
            src={session.user?.image ?? ''}
            width={40}
            height={40}
            alt='user'
            className='rounded-md'
          />
          <div className='font-semibold text-white'>{session.user?.name}</div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
