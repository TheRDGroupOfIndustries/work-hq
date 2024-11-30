import { StreamChat } from 'stream-chat';

const streamChat = new StreamChat(process.env.STREAM_API_KEY!, process.env.STREAM_API_SECRET);

export default streamChat;