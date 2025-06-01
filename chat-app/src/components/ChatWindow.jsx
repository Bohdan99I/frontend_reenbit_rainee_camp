import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chat) return;
    axios
      .get(`http://localhost:3000/api/messages/${chat._id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, [chat]);

  if (!chat)
    return <div style={{ flex: 1, padding: "1rem" }}>Виберіть чат</div>;

  return (
    <div style={{ flex: 1, padding: "1rem" }}>
      <h2>
        Чат з {chat.firstName} {chat.lastName}
      </h2>
      <div
        style={{
          height: "400px",
          overflowY: "scroll",
          border: "1px solid #eee",
          padding: "1rem",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <strong>{msg.sender}</strong>: {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
