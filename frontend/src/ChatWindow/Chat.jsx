import React, { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../MyContext.jsx";
import { HashLoader } from "react-spinners";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { loader, newChat, prevChat, reply, setPrevChat } =
    useContext(MyContext);

  const [latestReply, setLatestReply] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [prevChat, latestReply, loader]);

  useEffect(() => {
    if (!reply) return;

    let idx = 0;

    setLatestReply("");

    const interval = setInterval(() => {
      setLatestReply(reply.slice(0, idx + 1));
      idx++;

      if (idx >= reply.length) {
        clearInterval(interval);

        setPrevChat((prev) => [
          ...prev,
          {
            role: "assistant",
            content: reply,
          },
        ]);

        setLatestReply("");
      }
    }, 18);

    return () => clearInterval(interval);
  }, [reply]);

  return (
    <div
      style={{
        width: "100%",
maxWidth: "900px",
padding: "0 15px",
        height: "calc(100vh - 190px)",
        margin: "20px auto",
        overflowY: "auto",
        padding: "25px 15px 120px",
        background: "#0F172A",
        borderRadius: "22px",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 15px 40px rgba(0,0,0,.45)",
        scrollBehavior: "smooth",
      }}
    >
      {newChat && prevChat.length === 0 && (
        <div
          style={{
            height: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#94A3B8",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "70px" }}>🤖</div>

          <h2
            style={{
              marginTop: "20px",
              color: "white",
              fontWeight: "700",
            }}
          >
            How can I help today?
          </h2>

          <p>Ask me anything...</p>
        </div>
      )}

      {prevChat.map((chat, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            justifyContent:
              chat.role === "user" ? "flex-end" : "flex-start",
            marginBottom: "18px",
          }}
        >
          {chat.role === "assistant" && (
            <div
              style={{
                width: "40px",
                height: "40px",
                minWidth: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#2563EB,#4F46E5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10px",
                fontSize: "18px",
              }}
            >
                🤖
            </div>
          )}

          <div
            style={{
              background:
                chat.role === "user"
                  ? "linear-gradient(135deg,#2563EB,#3B82F6)"
                  : "#1E293B",

              color: "#fff",

              maxWidth: window.innerWidth < 768 ? "88%" : "75%",

              padding: "15px 18px",

              borderRadius:
                chat.role === "user"
                  ? "20px 20px 6px 20px"
                  : "20px 20px 20px 6px",

              boxShadow:
                chat.role === "user"
                  ? "0 8px 25px rgba(37,99,235,.35)"
                  : "0 8px 25px rgba(0,0,0,.25)",

              lineHeight: "1.8",
              fontSize: "15px",
              wordBreak: "break-word",
            }}
          >
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {chat.content}
            </Markdown>
          </div>

          {chat.role === "user" && (
            <div
              style={{
                width: "40px",
                height: "40px",
                minWidth: "40px",
                borderRadius: "50%",
                background: "#374151",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
                fontSize: "18px",
              }}
            >
              👤
            </div>
          )}
        </div>
      ))}

      {loader && !latestReply && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#2563EB,#4F46E5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            🤖
          </div>

          <div
            style={{
              background: "#1E293B",
              padding: "18px 22px",
              borderRadius: "20px",
            }}
          >
            <HashLoader color="#60A5FA" size={18} />
          </div>
        </div>
      )}

      {latestReply && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#2563EB,#4F46E5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            🤖
          </div>

          <div
            style={{
              background: "#1E293B",
              color: "white",
              padding: "15px 18px",
              borderRadius: "20px 20px 20px 6px",
              maxWidth: window.innerWidth < 768 ? "88%" : "75%",
              lineHeight: "1.8",
              fontSize: "15px",
              boxShadow: "0 8px 25px rgba(0,0,0,.25)",
            }}
          >
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {latestReply}
            </Markdown>
          </div>
        </div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default Chat;