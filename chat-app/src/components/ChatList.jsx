import React, { useEffect, useState } from "react";
import { fetchChats, deleteChat } from "../services/api";
import NewChatModal from "./NewChatModal";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [chatToEdit, setChatToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getChats = async () => {
    try {
      const res = await fetchChats();
      setChats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Ви точно хочете видалити цей чат?");
    if (!confirmed) return;
    try {
      await deleteChat(id);
      getChats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (chat) => {
    setChatToEdit(chat);
    setShowModal(true);
  };

  const filteredChats = chats.filter((chat) =>
    `${chat.firstName} ${chat.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{ width: "300px", borderRight: "1px solid #ccc", padding: "1rem" }}
    >
      <h2>Чати</h2>
      <button
        onClick={() => {
          setChatToEdit(null);
          setShowModal(true);
        }}
        style={{ marginBottom: "1rem" }}
      >
        + Новий чат
      </button>
      <input
        type="text"
        placeholder="Пошук..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredChats.map((chat) => (
          <li
            key={chat._id}
            style={{
              marginBottom: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <div
              onClick={() => onSelectChat(chat)}
              style={{ cursor: "pointer" }}
            >
              {chat.firstName} {chat.lastName}
            </div>
            <div style={{ marginTop: "0.5rem" }}>
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
        onClose={() => setShowModal(false)}
        onCreated={() => getChats()}
        chatToEdit={chatToEdit}
      />
    </div>
  );
};

export default ChatList;
