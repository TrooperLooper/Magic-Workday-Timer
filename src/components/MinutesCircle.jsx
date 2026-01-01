import React from "react";
import { CIRCLE_CONFIG, TIMER_TYPES, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";

export default function MinutesCircle({
  totalSeconds,
  secondsLeft,
  isRunning,
  timerType,
}) {
  const numDots = CIRCLE_CONFIG.NUM_DOTS;
  const radius = CIRCLE_CONFIG.RADIUS;
  const center = CIRCLE_CONFIG.CENTER;
  const rotationOffset = CIRCLE_CONFIG.ROTATION_OFFSET;

  // For long timer, expire from left of top dot (index 24), then 0, 1, ..., 23
  const firstDotIndex = numDots - 1; // Index just left of top dot

  function getLogicalIndex(i) {
    if (timerType === TIMER_TYPES.LONG) {
      // Left-to-right, starting at 24, ending at 0
      return (24 - i + numDots) % numDots;
    } else if (timerType === TIMER_TYPES.SHORT) {
      // Start at 4, end at 0 (indices 4,3,2,1,0)
      return (4 - i + numDots) % numDots;
    } else if (timerType === TIMER_TYPES.MEDIUM) {
      // Start at 19, end at 0 (indices 19,18,...,0)
      return (19 - i + numDots) % numDots;
    }
    return i;
  }

  return (
    <div className="minute-dots">
      {Array.from({ length: numDots }).map((_, i) => {
        const logicalIndex = getLogicalIndex(i);
        const angle = (2 * Math.PI * logicalIndex) / numDots + rotationOffset;
        const x = center + radius * Math.cos(angle) - 9;
        const y = center + radius * Math.sin(angle) - 9;

        // Only show blue for the first N dots
        const isActiveDot = i < totalSeconds;
        const expired = isActiveDot && i < totalSeconds - secondsLeft;
        const current = isActiveDot && i === totalSeconds - secondsLeft;

        let dotSrc = IMAGE_PATHS.minuteDots.expired;
        let zIndex = 1;

        if (isActiveDot) dotSrc = IMAGE_PATHS.minuteDots.left;
        if (expired) dotSrc = IMAGE_PATHS.minuteDots.expired;
        if (current && isRunning) {
          dotSrc = IMAGE_PATHS.minuteDots.current;
          zIndex = 99;
        }

        return (
          <img
            key={i}
            src={dotSrc}
            onError={handleImageError}
            alt="minute dot in a timer circle"
            className="minute-dot"
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: CIRCLE_CONFIG.DOT_SIZE,
              height: CIRCLE_CONFIG.DOT_SIZE,
              zIndex: zIndex,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}

