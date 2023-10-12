'use client';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { postQuestion } from '@/utils/api';
import { addMessage } from '@/utils/firebase';
import { nonEmptyStringRegex } from '@/utils/regex';

type Props = {
  chatId: string;
};

type SendMessageFrom = { prompt: string };

function ChatInput({ chatId }: Props) {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<SendMessageFrom>();

  const { data: model } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });

  const sendMessage = async ({ prompt }: SendMessageFrom) => {
    const message: Message = {
      text: prompt,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email ?? '',
        name: session?.user?.name ?? '',
        avatar:
          session?.user?.image ??
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    toast.promise(addMessage(session?.user?.email ?? '', chatId, message), {
      pending: {
        render() {
          return 'Processing';
        },
        autoClose: 1800,
      },
      success: {
        render() {
          resetField('prompt');
          return 'Succeed 👌';
        },
        autoClose: 1800,
        type: 'success',
      },
      error: {
        render() {
          return 'Error, try again 🤯';
        },
        autoClose: 3000,
        type: 'error',
      },
    });

    toast.promise(
      postQuestion({
        prompt,
        chatId,
        model,
        session,
      }),
      {
        pending: {
          render() {
            return 'ChatGPT is thinking...';
          },
          autoClose: 1800,
        },
        success: {
          render() {
            return 'ChatGPT has responded 👌';
          },
          autoClose: 1800,
          type: 'success',
        },
        error: {
          render() {
            return 'Error, try again 🤯';
          },
          autoClose: 3000,
          type: 'error',
        },
      }
    );
  };

  return (
    <div className='w-full px-4'>
      <form
        onSubmit={handleSubmit(sendMessage)}
        className='bg-gray-light mx-auto flex w-full max-w-4xl space-x-5 rounded-xl p-3 text-sm shadow-lg'
      >
        <textarea
          className='h-fit w-full flex-1 border-none bg-transparent p-0 text-white focus:ring-0'
          placeholder='Send a message'
          {...register('prompt', {
            required: 'Please enter your prompt',
            pattern: nonEmptyStringRegex,
          })}
        />
        <button
          disabled={!session || !!errors.prompt?.message}
          type='submit'
          className='mt-auto h-fit w-fit rounded bg-green-500 p-1.5'
        >
          <PaperAirplaneIcon className='h-5 w-5 text-white' />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
