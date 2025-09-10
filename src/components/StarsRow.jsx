import React from "react";

export default function StarsRow({ completedSets }) {
  return (
    <div
      className="stars-row"
      style={{
        display: "flex",
        gap: 3,
        justifyContent: "center",
        marginTop: 0,
      }}
    >
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          src={
            i < completedSets
              ? "/images/star_done.svg"
              : "/images/star_next.svg"
          }
          alt={`Star ${i + 1}`}
          style={{ width: 35, height: 35 }}
        />
      ))}
    </div>
  );
}
