import React, { useContext, useRef } from "react";
import axios from "axios";
import { MyContext } from "../MyContext.jsx";

function ChatInput() {
  const {
    prompt,
    setPrompt,
    setReply,
    currThread,
    setLoader,
    setPrevChat,
  } = useContext(MyContext);

  const textareaRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    const userPrompt = prompt;

    setPrevChat((prev) => [
      ...prev,
      {
        role: "user",
        content: userPrompt,
      },
    ]);

    setPrompt("");
    setReply("");
    setLoader(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/chat",
        {
          message: userPrompt,
          threadId: currThread,
        }
      );

      setReply(res.data.reply);
    } catch (err) {
      console.log(err);
    }

    setLoader(false);
  };

  return (
    <div
      style={{
        bottom: "20px",

        /* Sidebar 20% + Chat 80% */
        left: "20%",
        width: "100%",
maxWidth: "900px",

        display: "flex",
        justifyContent: "center",

        padding: "0 15px",
        boxSizing: "border-box",

        zIndex: 999,
      }}
    >
      <form
        onSubmit={submitHandler}
        style={{
          width: "100%",
          maxWidth: "900px",

          display: "flex",
          alignItems: "flex-end",
          gap: "12px",

          background: "#1b1d25",
          border: "1px solid #323845",
          borderRadius: "22px",

          padding: "12px",

          boxShadow: "0 15px 40px rgba(0,0,0,.35)",
        }}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={prompt}
          placeholder="Message AI..."
          onChange={(e) => {
            setPrompt(e.target.value);

            e.target.style.height = "56px";
            e.target.style.height =
              Math.min(e.target.scrollHeight, 150) + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitHandler(e);
            }
          }}
          style={{
            flex: 1,
            resize: "none",
            overflowY: "auto",

            minHeight: "56px",
            maxHeight: "150px",

            background: "transparent",
            border: "none",
            outline: "none",

            color: "white",
            fontSize: "16px",
            lineHeight: "1.6",

            padding: "14px 8px",
          }}
        />

        <button
          type="submit"
          disabled={!prompt.trim()}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "none",

            background: prompt.trim()
              ? "linear-gradient(135deg,#3B82F6,#2563EB)"
              : "#404652",

            color: "white",
            cursor: prompt.trim() ? "pointer" : "not-allowed",

            fontSize: "18px",
          }}
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

export default ChatInput;