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
// }
// import { GoogleGenerativeAI } from "@google/generative-ai";
  
//   const api = 'AIzaSyCclgNv826lneB1GUx4W6FxNiyEwMgUDoc'
//   const genAI = new GoogleGenerativeAI(api);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-pro",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
//   export default async function sendMessage(message) {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             {text: {message}},
//           ],
//         },
//       ],
//     });
  
//     const result = await chatSession.sendMessage("what is 4 + 4");
//     return(result.response.text())
//     console.log(result.response.text());
// 