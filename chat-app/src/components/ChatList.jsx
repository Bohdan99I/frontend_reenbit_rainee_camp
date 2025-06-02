import React, { useEffect, useState } from "react";
import axios from "axios";
import NewChatModal from "./NewChatModal";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchChats = () => {
    axios
      .get("http://localhost:3000/api/chats")
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div
      style={{ width: "300px", borderRight: "1px solid #ccc", padding: "1rem" }}
    >
      <h2>Чати</h2>
      <button
        onClick={() => setShowModal(true)}
        style={{ marginBottom: "1rem" }}
      >
        + Новий чат
      </button>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id} onClick={() => onSelectChat(chat)}>
            {chat.firstName} {chat.lastName}
          </li>
        ))}
      </ul>
      <NewChatModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={() => {
          fetchChats();
        }}
      />
    </div>
  );
};

export default ChatList;
