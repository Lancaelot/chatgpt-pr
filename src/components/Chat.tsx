'use client';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import Message from './Message';
import { db } from '../../firebase';

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user?.email ?? '',
          'chats',
          chatId,
          'messages'
        ),
        orderBy('createdAt', 'asc')
      )
  );

  return (
    <div className='h-screen flex-1 overflow-auto pb-40'>
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
      {messages?.empty && (
        <div className='text-gray-light mt-20 space-y-10 text-4xl'>
          <p className='text-center font-bold'>Enter your first prompt</p>
          <ArrowDownCircleIcon className='mx-auto h-14 w-14 animate-bounce' />
        </div>
      )}
    </div>
  );
}

export default Chat;
