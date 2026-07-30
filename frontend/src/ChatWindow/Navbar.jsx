import React from "react";

function Navbar() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Voxa.ai",
          text: "Check out my AI chatbot!",
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <nav
      className="navbar px-3 px-md-4"
      style={{
        minHeight: "72px",
        background: "rgba(15,23,42,.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
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
              fontWeight: "700",
              fontSize: "20px",
              boxShadow: "0 0 18px rgba(59,130,246,.4)",
              flexShrink: 0,
            }}
          >
            V
          </div>

          <span
            style={{
              marginLeft: "12px",
              color: "white",
              fontSize: "clamp(20px,3vw,26px)",
              fontWeight: "700",
              letterSpacing: ".5px",
              whiteSpace: "nowrap",
            }}
          >
            Voxa<span style={{ color: "#60A5FA" }}>.ai</span>
          </span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="btn d-flex align-items-center justify-content-center"
          style={{
            background:
              "linear-gradient(135deg,#2563EB,#3B82F6)",
            color: "white",
            borderRadius: "12px",
            padding: "10px 18px",
            border: "none",
            fontWeight: "600",
            transition: "all .25s ease",
            boxShadow:
              "0 6px 20px rgba(37,99,235,.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          <i className="fa-solid fa-share-nodes"></i>

          <span className="d-none d-md-inline ms-2">
            Share
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;