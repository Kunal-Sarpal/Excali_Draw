import { WebSocket, WebSocketServer } from "ws";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded?.userId ?? null;
  } catch {
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }

  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token") || "";
  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  const user: User = { userId, rooms: [], ws };
  users.push(user);

  ws.on("message", async function incoming(data) {
    try {
      let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }
    console.log(parsedData)
      if (parsedData.type === "join_room") {
        console.log("User joined")
        if (!user.rooms.includes(parsedData.roomId)) {
          user.rooms.push(parsedData.roomId);
        }
      }

      if (parsedData.type === "leave_room") {
        user.rooms = user.rooms.filter((room) => room !== parsedData.roomId);
      }

      if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;


        // Save to DB
        await prisma.chat.create({
          data: {
            message,
            roomId: Number(roomId),
            userId: user.userId,
          },
        });

        // Broadcast to all users in the same room
        console.log("Sendingg data to server")
        console.log(users.length)
        users.forEach(u => {
          if (u.rooms.includes(roomId)) {
            u.ws.send(JSON.stringify({
              type: "chat",
              message:message,
              roomId
            }));
          }
        });
      }
    } catch (err) {
      console.error("Error handling message:", err);
    }
  });

  ws.on("close", () => {
    // Remove disconnected user
    const index = users.findIndex((u) => u.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });

  // Optional greeting message
  ws.send(JSON.stringify({ type: "info", message: "✅ Connected to WebSocket server" }));
});
