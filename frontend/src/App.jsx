import { useState } from "react";
import ChatWindow from "./ChatWindow/ChatWindow.jsx";
import SideBar from "./SideBar/SideBar.jsx";
import { MyContext } from "./MyContext.jsx";
import "./App.css";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThread, setCurrThread] = useState(uuidv1());
  const [loader, setLoader] = useState(false);
  const [prevChat, setPrevChat] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const providerValue = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThread,
    setCurrThread,
    loader,
    setLoader,
    prevChat,
    setPrevChat,
    newChat,
    setNewChat,
    allThreads,
    setAllThreads,

    // Sidebar
    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <MyContext.Provider value={providerValue}>
      <div
        className="d-flex"
        style={{
          width: "100%",
          height: "100vh",
          background: "#000",
          overflow: "hidden",
        }}
      >
        <SideBar />
        <ChatWindow />
      </div>
    </MyContext.Provider>
  );
}

export default App;