import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const MainPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatList onSelectChat={setSelectedChat} />
      <ChatWindow chat={selectedChat} />
    </div>
  );
};

export default MainPage;
