import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";
import {prisma} from "@repo/db/client";
const wss = new WebSocketServer({ port: 8080 });


function checkUser(token:string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(typeof decoded === 'string'){
            return null;
        }
        if(!decoded || !decoded.userId){
            return null;
        }
        return decoded.userId
    } catch (error) {
        return null;
    }
}

interface User {
  userId: String,
  rooms: String[],
  ws: WebSocket
}
const users:User[] = []
wss.on('connection', function connection(ws,request) {
    const url = request.url;
    if(!url){
        return;
    }
    const params = new URLSearchParams(url?.split('?')[1]);
    const token = params.get('token') || "";  
   const userId = checkUser(token);
    if(userId === null){
      ws.close();
      return null;
    }

    users.push({
      userId,
      rooms:[],
      ws
    })
  ws.on('message', async function message(data) {
    const parsedData = JSON.parse(data.toString()); // {type:'join_room', roomId:1}
    // on join room
    if(parsedData.type === 'join_room'){
        const user = users.find(x=>x.ws === ws)
        user?.rooms.push(parsedData.roomId)
    } 
    // on leave room
    if(parsedData.type === 'leave_room'){
        const user = users.find(x=>x.ws === ws)
        if(!user){
          return;
        }
        user.rooms = user?.rooms.filter(x => x !== parsedData.roomId);

    }
    // on chat
    if(parsedData.type === 'chat'){
        const roomId = parsedData.roomId;
        const message = parsedData.message;
        // first put into db
        const res = await prisma.chat.create({
           data:{
            message,
            roomId,
            userId
           }
        })
        if(!res){
          return null;
        }
       users.forEach(user => {
          if(user.rooms.includes(roomId)){
            user.ws.send(JSON.stringify({
              type:'chat',
              message,
              roomId
            }))
          }
        })
      
    }
  });

  ws.send('Welcome to the WebSocket server!');
});