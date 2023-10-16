'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React from 'react';

type InfoTipCtaProps = {
  title: string;
  text: string;
  onClick: () => void;
};

const InfoTipCta: React.FunctionComponent<InfoTipCtaProps> = ({
  title,
  text,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='pointer hover:bg-gray-light group relative w-full rounded-xl border border-gray-600 py-2 pl-3 pr-10 text-left text-sm'
    >
      <div className='font-bold text-white'>{title}</div>
      <div className='text-gray-500'>{text}</div>
      <PaperAirplaneIcon className='absolute right-2 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white group-hover:block' />
    </button>
  );
};

export default InfoTipCta;
