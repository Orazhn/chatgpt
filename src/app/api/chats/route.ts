import { Redis } from '@upstash/redis'
import { IChatList } from '@/app/types/Chat'
import { v4 as uuidv4 } from 'uuid';
import { IChat } from '@/app/types/Chat';


const redis = new Redis({
  url: 'https://fluent-terrier-27867.upstash.io',
  token: 'AWzbAAIjcDE1NjQyMjcyOWQ2NDY0M2NhYmJhZThhNDY0MzQ4YTc5MHAxMA',
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
