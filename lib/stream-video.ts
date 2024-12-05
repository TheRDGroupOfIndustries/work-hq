import { StreamVideoClient } from '@stream-io/video-react-sdk';

if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
  throw new Error('NEXT_PUBLIC_STREAM_API_KEY is missing');
}

export const createStreamVideoClient = (userId: string, token: string) => {
  return new StreamVideoClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    user: { id: userId },
    token,
  });
};

export const initializeStreamVideo = async (userId: string, token: string) => {
  const client = createStreamVideoClient(userId, token);
  await client.connectUser({ id: userId }, token);
  return client;
};