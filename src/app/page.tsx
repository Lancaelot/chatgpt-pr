'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import InfoTipCta from '@/components/buttons/InfoTipButton';

import { postQuestion } from '@/utils/api';
import { addChat } from '@/utils/firebase';

const TEST_PROMPT_TEXTS = [
  {
    title: 'Come up with concepts',
    text: 'to request a quote from local plumbers',
  },
  {
    title: 'Recommended activities',
    text: 'to request a quote from local plumbers',
  },
  {
    title: 'Plan a trip',
    text: 'for a photography expedition Iceland',
  },
  {
    title: 'Brainstorm names',
    text: 'for my fantasy football team with a from theme',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSendTestPrompt = async (prompt: string) => {
    try {
      const { id } = await addChat(session?.user?.email ?? '');
      router.push(`chat/${id}`);
      return await postQuestion({
        prompt,
        chatId: id,
        model: 'text-davinci-003',
        session,
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <main>
      <Head>
        <title>chatGPT-test</title>
      </Head>

      <section className=' h-full w-full text-5xl'>
        <div className='container flex h-full min-h-screen  w-full flex-1 flex-col justify-between px-10 py-20'>
          <h1 className='text-gray-light mb-20 text-center text-5xl font-bold'>
            ChatGPT
          </h1>

          <div className='mx-auto grid w-full max-w-4xl grid-cols-2 gap-3'>
            {TEST_PROMPT_TEXTS.map((promt, index) => (
              <InfoTipCta
                title={promt.title}
                text={promt.text}
                onClick={() =>
                  handleSendTestPrompt(`${promt.title} ${promt.text}`)
                }
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
