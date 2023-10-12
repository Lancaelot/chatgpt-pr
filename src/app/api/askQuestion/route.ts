import admin from 'firebase-admin';
import { adminDb } from 'firebaseAdmin';

import query from '@/utils/queryApi';

export async function POST(req: Request) {
  const data = await req.json();
  const { prompt, chatId, model, session } = data;

  if (!prompt) {
    return new Response(
      JSON.stringify({ answer: 'Please provide a prompt!' }),
      { status: 400 }
    );
  }
  if (!chatId) {
    return new Response(
      JSON.stringify({ answer: 'Please provide a chatId!' }),
      { status: 400 }
    );
  }

  const response = await query(prompt, model);

  const message: Message = {
    text: response || 'ChatGpt was unable to find answer',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar:
        'https://seeklogo.com/images/C/chatgpt-logo-B3C0CF3025-seeklogo.com.png',
    },
  };

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);

  return new Response(JSON.stringify({ answer: message.text }), {
    status: 200,
  });
}
