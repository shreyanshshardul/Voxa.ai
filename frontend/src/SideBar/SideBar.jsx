import React, { useContext } from "react";
import { MyContext } from "../MyContext.jsx";
import History from "./History.jsx";
import Menu from "./Menu.jsx";

function SideBar() {
  const { sidebarOpen, setSidebarOpen } = useContext(MyContext);

  return (
    <div
      style={{
        width: sidebarOpen ? "280px" : "70px",
        height: "100vh",
        background: "#000",
        borderRight: "1px solid #2d3748",
        transition: "all .3s ease",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {sidebarOpen ? (
        <>
          <Menu />
          <History />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              border: "none",
              background: "#1F2937",
              color: "white",
              cursor: "pointer",
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default SideBar;