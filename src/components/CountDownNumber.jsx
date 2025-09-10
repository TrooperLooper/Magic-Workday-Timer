import React from "react";

export default function CountdownNumber({ value }) {
  return (
    <div
      className="countdown-number"
      style={{
        position: "absolute",
        top: "48%",
        left: "49%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
        fontSize: 70,
        fontWeight: "bold",
        fontFamily: "Arial Black, Arial, sans-serif",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      {value}
    </div>
  );
}
