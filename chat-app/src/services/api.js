import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Отримати список чатів (з optional пошуком)
export const fetchChats = (search = "") => {
  const url = `${API_BASE_URL}/chats${
    search ? `?q=${encodeURIComponent(search)}` : ""
  }`;
  return axios.get(url);
};

// Створити новий чат
export const createChat = (chatData) => {
  return axios.post(`${API_BASE_URL}/chats`, chatData);
};

// Оновити чат
export const updateChat = (chatId, updatedData) => {
  return axios.put(`${API_BASE_URL}/chats/${chatId}`, updatedData);
};

// Видалити чат
export const deleteChat = (chatId) => {
  return axios.delete(`${API_BASE_URL}/chats/${chatId}`);
};

// Отримати повідомлення в чаті
export const fetchMessages = (chatId) => {
  return axios.get(`${API_BASE_URL}/chats/${chatId}/messages`);
};

// Надіслати повідомлення
export const sendMessage = (chatId, messageData) => {
  return axios.post(`${API_BASE_URL}/chats/${chatId}/messages`, messageData);
};

// Видалити повідомлення
export const deleteMessage = (chatId, messageId) => {
  return axios.delete(`${API_BASE_URL}/chats/${chatId}/messages/${messageId}`);
};
