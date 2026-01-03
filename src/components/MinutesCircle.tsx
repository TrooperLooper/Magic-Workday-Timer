import React from "react";
import type { MinutesCircleProps } from "../types";
import { CIRCLE_CONFIG, TIMER_TYPES, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";
import { useCircleConfig } from "../hooks/useCircleConfig";

export default function MinutesCircle({
  totalSeconds,
  secondsLeft,
  isRunning,
  timerType,
}: MinutesCircleProps): React.ReactElement {
  const numDots = CIRCLE_CONFIG.NUM_DOTS;
  const rotationOffset = CIRCLE_CONFIG.ROTATION_OFFSET;
  
  const { radius, center, dotSize } = useCircleConfig();
  const dotOffset = dotSize / 2;

  // For long timer, expire from left of top dot (index 24), then 0, 1, ..., 23
  const firstDotIndex = numDots - 1; // Index just left of top dot

  function getLogicalIndex(i: number): number {
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
        const x = center + radius * Math.cos(angle) - dotOffset;
        const y = center + radius * Math.sin(angle) - dotOffset;

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
              width: dotSize,
              height: dotSize,
              zIndex: zIndex,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}
