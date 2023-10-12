import { NextResponse } from 'next/server';

import openai from '@/utils/chatgpt';

type Model = {
  value: string;
  label: string;
};

export async function GET() {
  const models = await openai.models.list().then((res) => res.data);

  const modelOptions: Model[] = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  return NextResponse.json(
    {
      modelOptions,
    },
    { status: 200 }
  );
}
