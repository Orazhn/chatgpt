import { Redis } from '@upstash/redis'
import { IChatList } from '@/app/types/Chat'
import { v4 as uuidv4 } from 'uuid';
import { IChat } from '@/app/types/Chat';
import dotenv from 'dotenv';


dotenv.config({ path: '.env.local' });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})


export async function GET() {
  try {
    const data:IChatList[]  = await redis.lrange('chats:123', 0, -1);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Redis error:', error);
  }
}

export async function POST(req: Request) {
  try {
    const { input, messages }: IChat = await req.json();

    const obj = {
      name: input,
      id: uuidv4(),
      messages: messages,
    };

    await redis.rpush('chats:123', JSON.stringify(obj));
    return new Response('Messages posted successfully', { status: 201 });
  } catch (error) {
    console.error('Redis error while posting:', error);
    return new Response('Failed to post messages', { status: 500 });
  }
}


export async function DELETE (req: Request) {
  try {
    const {id} = await req.json()

    const chats: IChatList[] = await redis.lrange('chats:123', 0, -1);

    // Find the chat that matches the chatId
    const chatToRemove = chats.find(chat => chat.id === id);

    if (!chatToRemove) {
      throw new Error(`Chat with ID ${id} not found.`);
    }
    await redis.lrem('chats:123', 1, JSON.stringify(chatToRemove));
    console.log(`Chat with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Redis error while deleting chat:', error);
    throw error;  // Propagate the error to be handled in the API route
  }



}