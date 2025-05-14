import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
  const [socket, setSocket] = useState<WebSocket>(); // ✅ FIX
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMWFkY2FiNC05YzMzLTRlNDAtYjUxYS1kMGE0NGQ1MzczZmUiLCJpYXQiOjE3NDcwNzIzNDh9.nDpEae_5hG5z7KvouZL9J6_CQf6LveFVZ67VjpVLAF8`);
    console.log("Hook  useSocket")
    ws.onopen = () => {
      console.log("Socket open");
      setSocket(ws);
      setLoading(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

  }, []);

  return {
    socket,
    loading,
  };
}
