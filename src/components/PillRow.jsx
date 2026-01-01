import React from "react";
import { TIMER_SEQUENCE, PILL_CONFIG, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";

const pillSvgs = [
  { done: IMAGE_PATHS.pills.workLong.done, next: IMAGE_PATHS.pills.workLong.next },
  { done: IMAGE_PATHS.pills.breakShort.done, next: IMAGE_PATHS.pills.breakShort.next },
  { done: IMAGE_PATHS.pills.workLong.done, next: IMAGE_PATHS.pills.workLong.next },
  { done: IMAGE_PATHS.pills.breakShort.done, next: IMAGE_PATHS.pills.breakShort.next },
  { done: IMAGE_PATHS.pills.workLong.done, next: IMAGE_PATHS.pills.workLong.next },
  { done: IMAGE_PATHS.pills.breakShort.done, next: IMAGE_PATHS.pills.breakShort.next },
  { done: IMAGE_PATHS.pills.workLong.done, next: IMAGE_PATHS.pills.workLong.next },
  { done: IMAGE_PATHS.pills.breakLong.done, next: IMAGE_PATHS.pills.breakLong.next },
];

export default function PillRow({ completedSteps }) {
  const isShortBreak = (index) =>
    TIMER_SEQUENCE[index].minutes === 5;

  return (
    <div className="pill-row">
      {pillSvgs.map((pill, i) => (
        <img
          key={i}
          src={i < completedSteps ? pill.done : pill.next}
          alt={`Pill ${i + 1}`}
          onError={handleImageError}
          style={{
            width: isShortBreak(i)
              ? PILL_CONFIG.SHORT_BREAK_SIZE
              : PILL_CONFIG.STANDARD_SIZE,
            height: isShortBreak(i)
              ? PILL_CONFIG.SHORT_BREAK_SIZE
              : PILL_CONFIG.STANDARD_SIZE,
          }}
        />
      ))}
    </div>
  );
}
