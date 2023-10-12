type QuestionBody = {
  prompt: string;
  chatId: string;
  model: string;
  session: any;
};

export const postQuestion = ({
  prompt,
  chatId,
  model,
  session,
}: QuestionBody) =>
  fetch('/api/askQuestion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      chatId,
      model,
      session,
    }),
  });
