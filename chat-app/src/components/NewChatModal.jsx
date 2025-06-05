import React, { useState, useEffect } from "react";
import { createChat, updateChat } from "../services/api";

const NewChatModal = ({ isOpen, onClose, onCreated, editingChat }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (editingChat) {
      setFirstName(editingChat.firstName);
      setLastName(editingChat.lastName);
    } else {
      setFirstName("");
      setLastName("");
    }
  }, [editingChat]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim()) return;

    const chatData = { firstName, lastName };

    if (editingChat) {
      updateChat(editingChat._id, chatData)
        .then(() => {
          onCreated();
          onClose();
        })
        .catch((err) => console.error(err));
    } else {
      createChat(chatData)
        .then(() => {
          onCreated();
          onClose();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>{editingChat ? "Редагувати чат" : "Новий чат"}</h2>
        <input
          placeholder="Ім’я"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={modalStyles.input}
        />
        <input
          placeholder="Прізвище"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={modalStyles.input}
        />
        <button onClick={handleSubmit} style={{ marginRight: "1rem" }}>
          {editingChat ? "Оновити" : "Створити"}
        </button>
        <button onClick={onClose}>Скасувати</button>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
  },
  input: {
    display: "block",
    marginBottom: "1rem",
    padding: "0.5rem",
    width: "100%",
  },
};

export default NewChatModal;
