import { StreamVideoClient } from '@stream-io/video-react-sdk';

if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
  throw new Error('NEXT_PUBLIC_STREAM_API_KEY is missing');
}

export const streamVideo = new StreamVideoClient({
  apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
});