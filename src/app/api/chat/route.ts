import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'; 

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


export async function POST(request: Request) {
    const { messages } = await request.json(); 

    const response = await openai.createChatCompletion({
        model: "gpt-4o",
        stream: true,
        messages: [
            { role: "user", content: "You are a helpful assistant."},
            ...messages
        ]
    })
    
    const stream = await OpenAIStream(response);
    return new StreamingTextResponse(stream);
}