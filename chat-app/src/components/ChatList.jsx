import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/chats")
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{ width: "300px", borderRight: "1px solid #ccc", padding: "1rem" }}
    >
      <h2>Чати</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id} onClick={() => onSelectChat(chat)}>
            {chat.firstName} {chat.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
