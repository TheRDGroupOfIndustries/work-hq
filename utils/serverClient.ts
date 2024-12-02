import { StreamChat } from 'stream-chat';

// Initialize the Stream Chat client with your API key and secret
const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

export { serverClient };