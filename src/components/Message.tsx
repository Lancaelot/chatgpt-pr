import clsx from 'clsx';
import { DocumentData } from 'firebase/firestore';
import React from 'react';

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === 'ChatGPT';
  return (
    <div className={clsx('px-4 py-6 text-white', isChatGPT && 'bg-gray-light')}>
      <div className='mx-auto flex max-w-4xl space-x-5 px-3'>
        <img src={message.user?.avatar ?? ''} className='h-8 w-8' alt='user' />

        <p className='pt-1 text-sm'>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
