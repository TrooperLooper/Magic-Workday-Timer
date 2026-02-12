import React from "react";
import type { MinutesCircleProps } from "../types";
import { CIRCLE_CONFIG, TIMER_TYPES } from "../constants";
import "./MinutesCircle.css";

export default function MinutesCircle({
  totalSeconds,
  secondsLeft,
  isRunning,
  timerType,
}: MinutesCircleProps): React.ReactElement {
  const numDots = CIRCLE_CONFIG.NUM_DOTS;
  const rotationOffset = CIRCLE_CONFIG.ROTATION_OFFSET;

  // Mobile-first base design
  const SVG_SIZE = 280;
  const CENTER = 140;
  const RADIUS = 85;
  const DOT_RADIUS = 6.3;

  function getLogicalIndex(i: number): number {
    if (timerType === TIMER_TYPES.LONG) {
      return (24 - i + numDots) % numDots;
    } else if (timerType === TIMER_TYPES.SHORT) {
      return (4 - i + numDots) % numDots;
    } else if (timerType === TIMER_TYPES.MEDIUM) {
      return (19 - i + numDots) % numDots;
    }
    return i;
  }

  return (
    <div className="minute-dots">
      <svg viewBox="0 0 280 280" className="minute-circle-svg">
        {Array.from({ length: numDots }).map((_, i) => {
          const logicalIndex = getLogicalIndex(i);
          const angle = (2 * Math.PI * logicalIndex) / numDots + rotationOffset;
          const x = CENTER + RADIUS * Math.cos(angle);
          const y = CENTER + RADIUS * Math.sin(angle);

          const isActiveDot = i < totalSeconds;
          const expired = isActiveDot && i < totalSeconds - secondsLeft;
          const current = isActiveDot && i === totalSeconds - secondsLeft;

          let dotClass = "minute-dot-expired";
          if (isActiveDot) dotClass = "minute-dot-active";
          if (expired) dotClass = "minute-dot-expired";
          if (current && isRunning) dotClass = "minute-dot-current";
          if (current && !isRunning) dotClass = "minute-dot-active";

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={DOT_RADIUS}
              className={`minute-dot ${dotClass}`}
            />
          );
        })}
      </svg>
    </div>
  );
}
