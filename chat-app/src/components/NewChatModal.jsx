import React, { useState } from "react";
import axios from "axios";

const NewChatModal = ({ isOpen, onClose, onCreated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!firstName.trim() || !lastName.trim()) return;

    axios
      .post("http://localhost:3000/api/chats", { firstName, lastName })
      .then((res) => {
        onCreated(res.data);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <h2>Новий чат</h2>
        <input
          placeholder="Ім’я"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          placeholder="Прізвище"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button onClick={handleCreate} style={{ marginRight: "1rem" }}>
          Створити
        </button>
        <button onClick={onClose}>Скасувати</button>
      </div>
    </div>
  );
};

export default NewChatModal;