import { Redis } from '@upstash/redis'
import { IChatList } from '@/app/types/Chat'
import { v4 as uuidv4 } from 'uuid';
import { IChat } from '@/app/types/Chat';


const redis = new Redis({
  url: 'https://fluent-terrier-27867.upstash.io',
  token: 'AWzbAAIjcDE1NjQyMjcyOWQ2NDY0M2NhYmJhZThhNDY0MzQ4YTc5MHAxMA',
})


export default async function getChats() {
  try {
    const data:IChatList[]  = await redis.lrange('chats:123', 0, -1);
    return data
  } catch (error) {
    console.error('Redis error:', error);
  }
}

export async function postData({input, messages}: IChat) {
  const obj = {
    name: input,
    id: uuidv4(),
    messages: messages,
  }
  try {
      await redis.rpush('chats:123', JSON.stringify(obj))
      console.log('Messages posted successfully.');
  } catch (error) {
      console.error('Redis error while posting:', error);
  }
}

