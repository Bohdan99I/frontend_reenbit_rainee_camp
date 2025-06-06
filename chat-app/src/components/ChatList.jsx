import React, { useEffect, useState } from "react";
import { fetchChats, deleteChat } from "../services/api";
import NewChatModal from "./NewChatModal";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editChat, setEditChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadChats = async (query = "") => {
    try {
      const res = await fetchChats(query);
      setChats(res.data);
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    loadChats(value);
  };

  const handleDelete = async (chatId) => {
    if (window.confirm("Ти впевнений, що хочеш видалити цей чат?")) {
      await deleteChat(chatId);
      loadChats(searchTerm);
    }
  };

  const handleEdit = (chat) => {
    setEditChat(chat);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditChat(null);
  };

  const handleModalSaved = () => {
    loadChats(searchTerm);
    handleModalClose();
  };

  return (
    <div
      style={{ width: "300px", borderRight: "1px solid #ccc", padding: "1rem" }}
    >
      <h2>Чати</h2>
      <input
        type="text"
        placeholder="Пошук..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      />
      <button
        onClick={() => setShowModal(true)}
        style={{ marginBottom: "1rem" }}
      >
        + Новий чат
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
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
                onClick={() => handleEdit(chat)}
                style={{ marginRight: "0.5rem" }}
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
        onClose={handleModalClose}
        onSaved={handleModalSaved}
        chatToEdit={editChat}
      />
    </div>
  );
};

export default ChatList;