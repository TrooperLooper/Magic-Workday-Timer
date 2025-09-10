import React from "react";

export default function BigButtonDot({
  color = "red",
  isRunning,
  onClick,
  children,
}) {
  const buttonImg =
    color === "red" ? "/images/button_work.svg" : "/images/button_break.svg"; // Use your green SVG for break

  return (
    <div
      className={`center-button${isRunning ? " pulse" : ""}`}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img
        src={buttonImg}
        alt="Work Button"
        style={{ width: 140, height: 140 }}
      />
      {children}
    </div>
  );
}
