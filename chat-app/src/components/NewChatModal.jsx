import React, { useState, useEffect } from "react";
import { createChat, updateChat } from "../services/api";

const NewChatModal = ({ isOpen, onClose, onCreated, chatToEdit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (chatToEdit) {
      setFirstName(chatToEdit.firstName);
      setLastName(chatToEdit.lastName);
    } else {
      setFirstName("");
      setLastName("");
    }
  }, [chatToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) return;

    try {
      if (chatToEdit) {
        await updateChat(chatToEdit._id, { firstName, lastName });
      } else {
        await createChat({ firstName, lastName });
      }

      onCreated();
      onClose();
    } catch (error) {
      console.error("Помилка при збереженні чату:", error);
    }
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
        <h2>{chatToEdit ? "Редагувати чат" : "Новий чат"}</h2>
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
        <button onClick={handleSubmit} style={{ marginRight: "1rem" }}>
          {chatToEdit ? "Зберегти" : "Створити"}
        </button>
        <button onClick={onClose}>Скасувати</button>
      </div>
    </div>
  );
};

export default NewChatModal;
