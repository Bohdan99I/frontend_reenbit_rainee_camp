import React, { useEffect, useState } from "react";
import { fetchChats, deleteChat } from "../services/api";
import NewChatModal from "./NewChatModal";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingChat, setEditingChat] = useState(null);

  const loadChats = () => {
    fetchChats()
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Точно видалити цей чат?")) {
      deleteChat(id)
        .then(() => loadChats())
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  return (
    <div
      style={{ width: "300px", borderRight: "1px solid #ccc", padding: "1rem" }}
    >
      <h2>Чати</h2>
      <button
        onClick={() => {
          setEditingChat(null);
          setShowModal(true);
        }}
        style={{ marginBottom: "1rem" }}
      >
        + Новий чат
      </button>

      <ul>
        {chats.map((chat) => (
          <li key={chat._id} style={{ marginBottom: "0.5rem" }}>
            <span
              onClick={() => onSelectChat(chat)}
              style={{ cursor: "pointer" }}
            >
              {chat.firstName} {chat.lastName}
            </span>
            <div>
              <button
                onClick={() => {
                  setEditingChat(chat);
                  setShowModal(true);
                }}
              >
                ✏️
              </button>
              <button onClick={() => handleDelete(chat._id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>

      <NewChatModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={loadChats}
        editingChat={editingChat}
      />
    </div>
  );
};

export default ChatList;
