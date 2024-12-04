import { StreamChat } from 'stream-chat';
import { StreamVideoClient } from '@stream-io/video-react-sdk';

if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
  throw new Error('NEXT_PUBLIC_STREAM_API_KEY is missing');
}

if (!process.env.STREAM_API_SECRET) {
  throw new Error('STREAM_API_SECRET is missing');
}

// Initialize the Stream Chat client with your API key and secret
const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

// Initialize the Stream Video client
const serverVideoClient = new StreamVideoClient({
  apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  user: { id: 'server' },
  token: serverClient.createToken('server'),
});

// Function to create a token for a user
const createVideoToken = (userId: string) => {
  if (typeof userId !== 'string' || userId.trim() === '') {
    throw new Error('Invalid userId: userId must be a non-empty string');
  }
  return serverClient.createToken(userId);
};

export { serverClient, serverVideoClient, createVideoToken };