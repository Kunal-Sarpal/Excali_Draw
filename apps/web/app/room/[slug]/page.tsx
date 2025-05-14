import ChatRoom from "../../../components/ChatRoom";
import { BACKEND_URL } from "../../config";
import axios from "axios";


async function getRoomId(slug: string){
    const response = await axios.get<{id:number,message:string}>(`${BACKEND_URL}/room/${slug}`,{
        headers: {
    
            Authorization :`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OWEwMzJmOS1hMzcxLTRhZDAtYjIzNi1hODI0MzkyOGZhNmMiLCJpYXQiOjE3NDcxMTcxNzl9.m04-ai5MnaI0M8qcpXH-oh_Xi-tv726qnuTDfQvWfuE`
        }
    });
    return response.data.id;
}


export default async function Home({
    params
}:{
    params:{
        slug:string
    }
}):Promise<any> {
    try{
        const slug = (await params).slug;
        const roomId = await getRoomId(slug);
        if(!roomId){
            return <div>Room not found</div>
        }
        return <ChatRoom id={roomId.toString()}></ChatRoom>

    }
    catch (error) {
        return <div style={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center", flexDirection:"column"}}>Room not found</div>
    }
}