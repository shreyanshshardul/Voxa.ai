import React from "react";
import Navbar from "./Navbar.jsx";
import Chat from "./Chat.jsx";
import ChatInput from "./ChatInput.jsx";

function ChatWindow() {
  return (
    <div
      style={{
        width: "80vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at top,#1E293B 0%,#111827 35%,#0B0909 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Chat />
      </div>

      {/* Input */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          padding: "0 20px",
          zIndex: 100,
        }}
      >
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatWindow;