import React from "react";

const pillSvgs = [
  { done: "/images/work_long_done.svg", next: "/images/work_long_next.svg" },
  {
    done: "/images/break_short_done.svg",
    next: "/images/break_short_next.svg",
  },
  { done: "/images/work_long_done.svg", next: "/images/work_long_next.svg" },
  {
    done: "/images/break_short_done.svg",
    next: "/images/break_short_next.svg",
  },
  { done: "/images/work_long_done.svg", next: "/images/work_long_next.svg" },
  {
    done: "/images/break_short_done.svg",
    next: "/images/break_short_next.svg",
  },
  { done: "/images/work_long_done.svg", next: "/images/work_long_next.svg" },
  { done: "/images/break_long_done.svg", next: "/images/break_long_next.svg" },
];

export default function PillRow({ completedSteps }) {
  return (
    <div
      className="pill-row"
      style={{
        display: "flex",
        gap: 3,
        justifyContent: "center",
        marginTop: "-14px", // Reduced by ~30%
      }}
    >
      {pillSvgs.map((pill, i) => (
        <img
          key={i}
          src={i < completedSteps ? pill.done : pill.next}
          alt={`Pill ${i + 1}`}
          style={{
            width: pill.done.includes("break_short") ? 12 : 30,
            height: pill.done.includes("break_short") ? 12 : 30,
          }}
        />
      ))}
    </div>
  );
}
