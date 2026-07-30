import React, { useContext } from "react";
import { MyContext } from "../MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Menu() {
  const {
    setNewChat,
    setPrompt,
    setReply,
    setCurrThread,
    setPrevChat,
    setSidebarOpen,
  } = useContext(MyContext);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThread(uuidv1());
    setPrevChat([]);
  };

  return (
    <div
      style={{
        padding: "18px 15px",
        borderBottom: "1px solid #1f2937",
      }}
    >
      {/* Logo + Collapse */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#3B82F6,#8B5CF6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              boxShadow: "0 0 18px rgba(59,130,246,.4)",
            }}
          >
            V
          </div>

          <h5
            style={{
              color: "white",
              margin: 0,
              fontWeight: "700",
            }}
          >
            Voxa<span style={{ color: "#60A5FA" }}>.ai</span>
          </h5>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            border: "none",
            background: "#1F2937",
            color: "#9CA3AF",
            cursor: "pointer",
            transition: ".25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#374151";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#1F2937";
            e.currentTarget.style.color = "#9CA3AF";
          }}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
      </div>

      {/* New Chat */}
      <button
        onClick={createNewChat}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "14px",
          border: "none",
          cursor: "pointer",
          background:
            "linear-gradient(135deg,#2563EB,#3B82F6)",
          color: "white",
          fontWeight: "600",
          fontSize: "15px",
          transition: ".3s",
          boxShadow:
            "0 8px 20px rgba(37,99,235,.35)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <i
          className="fa-solid fa-plus"
          style={{ marginRight: "10px" }}
        ></i>
        New Chat
      </button>
    </div>
  );
}

export default Menu;