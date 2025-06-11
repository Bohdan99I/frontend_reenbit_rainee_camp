// src/components/Toast.jsx
import React, { useEffect } from "react";

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return <div style={styles.toast}>{message}</div>;
};

const styles = {
  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#333",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "6px",
    zIndex: 9999,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    fontSize: "14px",
  },
};

export default Toast;
