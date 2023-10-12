import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../../firebase';

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email ?? '', 'chats', id, 'messages')
  );

  const isActiveRow = pathname && pathname.includes(id);

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email ?? '', 'chats', id));

    router.replace('/');
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={clsx(
        ' hover:bg-gray flex items-center justify-between space-x-2 rounded-md p-3 text-sm text-white',
        isActiveRow && 'bg-gray'
      )}
    >
      <div className='flex items-center space-x-2 truncate'>
        <ChatBubbleLeftIcon className='h-4 w-4 shrink-0' />
        <div className='truncate'>
          {messages?.docs[messages.docs.length - 1]?.data().text || 'New Chat'}
        </div>
      </div>
      <TrashIcon
        onClick={removeChat}
        className='text-gray-light ml-auto h-5 w-5 shrink-0 hover:text-red-700'
      />
    </Link>
  );
}

export default ChatRow;
