import React, { useContext, useEffect } from "react";
import { MyContext } from "../MyContext.jsx";
import axios from "axios";


function History() {
  const BASE_URL=import.meta.env.VITE_BACKEND_URL;
  const {
    allThreads,
    setAllThreads,
    currThread,
    setCurrThread,
    setPrevChat,
    setNewChat,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/thread`
      );

      const filterData = response.data.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filterData);
    } catch (err) {
      console.log(err);
    }
  };

  const changeThread = async (newThreadId) => {
    setCurrThread(newThreadId);

    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/thread/${newThreadId}`
      );

      setPrevChat(response.data);
      setNewChat(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async(e, threadId) => {
    e.stopPropagation(); // Prevent opening chat
    console.log("Delete Thread:", threadId);
    const response = await axios.delete(`${BASE_URL}/api/v1/deleteThread/${threadId}`);
    console.log(response);
     getAllThreads();
  };

  useEffect(() => {
    getAllThreads();
  }, []);

  return (
    <div
      style={{
        height: "77vh",
        display: "flex",
        flexDirection: "column",
        background: "#111827",
      }}
    >
      {/* Heading */}
      <h5
        style={{
          color: "white",
          padding: "20px 18px 10px",
          fontWeight: "600",
          letterSpacing: ".5px",
        }}
      >
        Recent Chats
      </h5>

      {/* Chat History */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 10px",
        }}
      >
        {allThreads?.map((thread) => (
          <div
            key={thread.threadId}
            onClick={() => changeThread(thread.threadId)}
            style={{
              padding: "12px 14px",
              marginBottom: "8px",
              borderRadius: "12px",
              cursor: "pointer",
              background:
                currThread === thread.threadId
                  ? "#2563EB"
                  : "transparent",
              color: "white",
              transition: "all .25s ease",
              border:
                currThread === thread.threadId
                  ? "1px solid #60A5FA"
                  : "1px solid transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => {
              if (currThread !== thread.threadId) {
                e.currentTarget.style.background = "#1F2937";
              }
            }}
            onMouseLeave={(e) => {
              if (currThread !== thread.threadId) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {/* Left Side */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <i className="fa-regular fa-message"></i>

              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                }}
              >
                {thread.title}
              </span>
            </div>

            {/* Right Side Trash */}
            <i
              className="fa-solid fa-trash"
              onClick={(e) => deleteThread(e, thread.threadId)}
              style={{
                color: "#9CA3AF",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#EF4444";
                e.currentTarget.style.background = "#1F2937";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9CA3AF";
                e.currentTarget.style.background = "transparent";
              }}
            ></i>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #2d3748",
          color: "#9CA3AF",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        ❤️ Made by <br />
        <strong style={{ color: "#fff" }}>
          Shreyansh Shardul
        </strong>
      </div>
    </div>
  );
}

export default History;