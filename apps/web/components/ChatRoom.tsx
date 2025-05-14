
import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomComponent from "./ChatRoomClient";
import { measureMemory } from "vm";

// types/chat.ts


async function getChats(roomId:string) {
 const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`,{
     headers: {
            Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OWEwMzJmOS1hMzcxLTRhZDAtYjIzNi1hODI0MzkyOGZhNmMiLCJpYXQiOjE3NDcxMTcxNzl9.m04-ai5MnaI0M8qcpXH-oh_Xi-tv726qnuTDfQvWfuE`
        }
 });
//  console.log(response.data);
 return response.data.chats;
}
export default async function ChatRoom({id}:{id:string}) {
    const messages = await getChats(id);
    return <ChatRoomComponent messages={messages} roomId={id}></ChatRoomComponent>
    
}