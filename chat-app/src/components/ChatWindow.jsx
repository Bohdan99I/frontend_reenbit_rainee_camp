import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!chat) return;
    axios
      .get(`http://localhost:3000/api/messages/${chat._id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, [chat]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const message = { sender: "user", text };
    setMessages((prev) => [...prev, message]);
    setText("");

    axios
      .post(`http://localhost:3000/api/messages/${chat._id}`, { text })
      .then(() => {
        setTimeout(() => {
          axios
            .get(`http://localhost:3000/api/messages/${chat._id}`)
            .then((res) => setMessages(res.data));
        }, 3000);
      })
      .catch((err) => console.error(err));
  };

  if (!chat)
    return <div style={{ flex: 1, padding: "1rem" }}>Виберіть чат</div>;

  return (
    <div
      style={{
        flex: 1,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>
        Чат з {chat.firstName} {chat.lastName}
      </h2>
      <div
        style={{
          flex: 1,
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

      <div style={{ marginTop: "1rem" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ваше повідомлення..."
          style={{ width: "80%", padding: "0.5rem" }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}
        >
          Надіслати
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
