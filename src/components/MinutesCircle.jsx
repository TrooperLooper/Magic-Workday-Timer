import React from "react";

export default function MinutesCircle({
  totalSeconds,
  secondsLeft,
  isRunning,
}) {
  const numDots = 25;
  const radius = 100;
  const center = 200;
  const rotationOffset = -Math.PI / 2; // Rotate so top dot is at index 0

  // For long timer, expire from left of top dot (index 24), then 0, 1, ..., 23
  const firstDotIndex = numDots - 1; // Index just left of top dot

  return (
    <div
      className="minute-dots"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {Array.from({ length: numDots }).map((_, i) => {
        // Calculate rotated index for left-to-right expiration
        const logicalIndex = (firstDotIndex - i + numDots) % numDots;
        const angle = (2 * Math.PI * i) / numDots + rotationOffset;
        const x = center + radius * Math.cos(angle) - 9;
        const y = center + radius * Math.sin(angle) - 9;

        // Only show blue for the first N dots
        const isActiveDot = logicalIndex < totalSeconds;
        const expired =
          isActiveDot && logicalIndex < totalSeconds - secondsLeft;
        const current =
          isActiveDot && logicalIndex === totalSeconds - secondsLeft;

        let dotSrc = "/images/minute_expired.svg";
        let zIndex = 1;

        if (isActiveDot) dotSrc = "/images/minute_left.svg";
        if (expired) dotSrc = "/images/minute_expired.svg";
        if (current && isRunning) {
          dotSrc = "/images/minute_current.svg";
          zIndex = 99;
        }

        return (
          <img
            key={i}
            src={dotSrc}
            alt="minute dot"
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 18,
              height: 18,
              zIndex: zIndex,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}

function App() {
  const currentTimer = { minutes: 60 }; // Example timer
  const timeLeft = 30; // Example time left
  const isRunning = true; // Example running state

  return (
    <MinutesCircle
      totalSeconds={currentTimer.minutes}
      secondsLeft={timeLeft}
      isRunning={isRunning}
    />
  );
}
