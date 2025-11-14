// Notification.jsx
import React from "react";


const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 999,
  },
  panel: {
    width: "90%",
    maxWidth: "600px",
    height: "80%",
    marginTop: "40px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    position: "relative",
    overflowY: "auto",
    animation: "fallPanel 0.8s ease-in-out",
  },
  heading: {
    margin: 0,
    fontSize: "1.8rem",
    color: "#2d3436",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "15px",
  },
  notification: {
    display: "flex",
    alignItems: "center",
    background: "#f9fafc",
    borderRadius: "10px",
    padding: "12px 14px",
    transition: "0.2s ease-in-out",
  },
  message: { flex: 1, color: "#333", fontSize: "0.95rem" },
  time: { fontSize: "0.8rem", color: "#888", marginLeft: "10px" },
  closePanel: {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "none",
    border: "none",
    fontSize: "1.4rem",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#666",
  },
  empty: { textAlign: "center", color: "#666", padding: "30px 20px", fontStyle: "italic" },
};

const NotificationPanel = ({ isOpen, onClose }) => {
  const notificationpanel = [
    { id: 1, message: "Your account has been upgraded successfully!", time: "2h ago" },
    { id: 2, message: "You have a new message from Sarah.", time: "4h ago" },
    { id: 3, message: "Server maintenance scheduled for tonight.", time: "1d ago" },
  ];

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          @keyframes fallPanel {
            0% { transform: translateY(-150%) scale(0.9); opacity: 0; }
            60% { transform: translateY(20px) scale(1.02); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }
        `}
      </style>

      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
          <button style={styles.closePanel} onClick={onClose}>×</button>
          <h2 style={styles.heading}>Notifications</h2>
          <div style={styles.list}>
            {notificationpanel.length > 0 ? (
              notificationpanel.map((note) => (
                <div key={note.id} style={styles.notification}>
                  <div style={styles.message}>{note.message}</div>
                  <div style={styles.time}>{note.time}</div>
                </div>
              ))
            ) : (
              <div style={styles.empty}>No new notifications 🎉</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
