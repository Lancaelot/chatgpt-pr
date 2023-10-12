import openai from './chatgpt';

const query = async (prompt: string, model: string) => {
  const res = await openai.completions
    .create({
      model,
      prompt,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 1,
      temperature: 0.9,
      max_tokens: 1000,
    })
    .then((res) => res.choices[0].text)
    .catch(
      (err) => `ChatGPT was unable to find an answer! (Error: ${err.message})`
    );

  return res;
};

export default query;
