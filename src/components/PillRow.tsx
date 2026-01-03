import React from "react";
import type { PillRowProps } from "../types";
import { TIMER_SEQUENCE, PILL_CONFIG, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";

const pillSvgs = [
  {
    done: IMAGE_PATHS.pills.workLong.done,
    next: IMAGE_PATHS.pills.workLong.next,
  },
  {
    done: IMAGE_PATHS.pills.breakShort.done,
    next: IMAGE_PATHS.pills.breakShort.next,
  },
  {
    done: IMAGE_PATHS.pills.workLong.done,
    next: IMAGE_PATHS.pills.workLong.next,
  },
  {
    done: IMAGE_PATHS.pills.breakShort.done,
    next: IMAGE_PATHS.pills.breakShort.next,
  },
  {
    done: IMAGE_PATHS.pills.workLong.done,
    next: IMAGE_PATHS.pills.workLong.next,
  },
  {
    done: IMAGE_PATHS.pills.breakShort.done,
    next: IMAGE_PATHS.pills.breakShort.next,
  },
  {
    done: IMAGE_PATHS.pills.workLong.done,
    next: IMAGE_PATHS.pills.workLong.next,
  },
  {
    done: IMAGE_PATHS.pills.breakLong.done,
    next: IMAGE_PATHS.pills.breakLong.next,
  },
];

export default function PillRow({
  completedSteps,
}: PillRowProps): React.ReactElement {
  const isShortBreak = (index: number): boolean =>
    TIMER_SEQUENCE[index].minutes === 5;

  return (
    <div
      className="pill-row"
      role="progressbar"
      aria-label={`Timer steps progress: ${completedSteps} of ${TIMER_SEQUENCE.length} completed`}
      aria-valuenow={completedSteps}
      aria-valuemin={0}
      aria-valuemax={TIMER_SEQUENCE.length}
    >
      {pillSvgs.map((pill, i) => (
        <img
          key={i}
          src={i < completedSteps ? pill.done : pill.next}
          alt={`${i < completedSteps ? "Completed" : "Upcoming"} timer block ${
            i + 1
          }`}
          aria-hidden="true"
          onError={handleImageError}
          className={isShortBreak(i) ? "pill_short" : "pill_long"}
        />
      ))}
    </div>
  );
}
