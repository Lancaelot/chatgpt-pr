import { serverTimestamp } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';

import { db } from '../../firebase';

export const addMessage = (
  useEmail: string,
  chatId: string,
  message: Message
) =>
  addDoc(
    collection(db, 'users', useEmail, 'chats', chatId, 'messages'),
    message
  );

export const addChat = async (useEmail: string) =>
  await addDoc(collection(db, 'users', useEmail, 'chats'), {
    userId: useEmail,
    createdAt: serverTimestamp(),
  });
