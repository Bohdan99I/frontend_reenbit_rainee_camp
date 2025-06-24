# frontend_reenbit_rainee_camp

Це frontend частина додатку чату, створена на React. Працює з backend-сервером, який відповідає випадковими цитатами через 3 секунди після надсилання повідомлення.

## 🚀 Швидкий старт

### 1. Клонувати репозиторій

```bash

git clone https://github.com/your-username/frontend_reenbit_rainee_camp.git

cd frontend_reenbit_rainee_camp

```

### 2. Встановити залежності

```bash

npm install

```

### 3. Запустити застосунок

```bash

npm run dev

```

> Застосунок буде доступний за адресою: http://localhost:5173

## 📦 Стек технологій

- React

- HTML / CSS (без UI-бібліотек)

- Axios

- Vite

## 📁 Структура проєкту

```

src/
├── components/
│   ├── ChatList.jsx        # Список чатів
│   ├── ChatWindow.jsx      # Повідомлення в чаті
│   ├── NewChatModal.jsx    # Модалка для створення / редагування чату
│   ├── Toast.jsx           # Toast-повідомлення
├── pages/
│   └── MainPage.jsx        # Основна сторінка
├── services/
│   └── api.js              # Взаємодія з backend API
├── App.jsx
├── main.jsx

```

## 🔧 Основний функціонал

- Список чатів з пошуком

- Створення нового чату

- Редагування чату

- Видалення з підтвердженням

- Відображення повідомлень

- Відправка повідомлення

- Авто-відповідь через 3 секунди

- Toast-повідомлення

## 🔗 Backend API

Цей застосунок підключається до API за адресою:

```bash

http://localhost:3000/api

```

> Налаштовано в `services/api.js`.

## ✍️ Автор

Bohdan Voitov
