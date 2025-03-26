"use client";

import { useEffect, useState } from "react";

export default function Notification() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket(
      "wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"
    );

    socket.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessage(JSON.parse(event.data).message);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-bold">Notifications</h2>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}
