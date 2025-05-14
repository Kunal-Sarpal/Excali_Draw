"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomComponent({
    messages,
    roomId,
}: {
    messages: { message: string }[];
    roomId: string;
}) {
    const {socket, loading } = useSocket();
    const [msg, setMsg] = useState(messages);
    const [currentMsg, setCurrentMsg] = useState("");
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    useEffect(() => {
        if (socket && !loading) {

            socket.send(JSON.stringify({
                type: "join_room",
                roomId: roomId
            }));

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setMsg(c => [...c, {message: parsedData.message}])
                }
            }
        }

}, [socket, loading, roomId]);

const handleSendMessage = () => {
    console.log("In ht handle message")
    socket?.send(JSON.stringify({
      type: "chat",
      roomId: roomId,
      message: currentMsg,
    }));
    setCurrentMsg("");
  
};

return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    }}>
        {msg.map((m, i) => (
            <div key={i} className="p-2 m-2 bg-gray-200 rounded-md">
                {m.message}
            </div>
        ))}
        <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
                type="text"
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
            />
            <button onClick={handleSendMessage}>
                Send Message
            </button>
        </div>
    </div>
);
}
