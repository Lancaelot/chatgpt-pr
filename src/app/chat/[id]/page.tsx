import React from 'react';

import Chat from '@/components/Chat';
import ChatInput from '@/components/ChatInput';

type ChatPageProps = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: ChatPageProps) {
  return (
    <div className='relativeflex h-screen w-full flex-col overflow-hidden'>
      <Chat chatId={id} />

      <div className='shadowm md sticky bottom-0 w-full py-10'>
        <ChatInput chatId={id} />
      </div>
    </div>
  );
}

export default ChatPage;
