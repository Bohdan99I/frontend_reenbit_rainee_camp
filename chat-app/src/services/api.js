import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Отримати список чатів
export const fetchChats = () => {
  return axios.get(`${API_BASE_URL}/chats`);
};

// Створити новий чат
export const createChat = (chatData) => {
  return axios.post(`${API_BASE_URL}/chats`, chatData);
};

// Отримати повідомлення в чаті
export const fetchMessages = (chatId) => {
  return axios.get(`${API_BASE_URL}/chats/${chatId}/messages`);
};

// Надіслати повідомлення
export const sendMessage = (chatId, messageData) => {
  return axios.post(`${API_BASE_URL}/chats/${chatId}/messages`, messageData);
};

// Оновити чат
export const updateChat = (chatId, updatedData) => {
  return axios.put(`${API_BASE_URL}/chats/${chatId}`, updatedData);
};

// Видалити чат
export const deleteChat = (chatId) => {
  return axios.delete(`${API_BASE_URL}/chats/${chatId}`);
};

// Видалити повідомлення
export const deleteMessage = (chatId, messageId) => {
  return axios.delete(`${API_BASE_URL}/chats/${chatId}/messages/${messageId}`);
};