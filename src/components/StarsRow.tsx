import React from "react";
import type { StarsRowProps } from "../types";
import { MAX_SETS, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";

export default function StarsRow({
  completedSets,
}: StarsRowProps): React.ReactElement {
  return (
    <div
      className="stars-row"
      role="progressbar"
      aria-label={`Workday progress: ${completedSets} of ${MAX_SETS} sets completed`}
      aria-valuenow={completedSets}
      aria-valuemin={0}
      aria-valuemax={MAX_SETS}
    >
      {[...Array(MAX_SETS)].map((_, i) => (
        <img
          key={i}
          src={
            i < completedSets ? IMAGE_PATHS.stars.done : IMAGE_PATHS.stars.next
          }
          onError={handleImageError}
          alt={`${i < completedSets ? "Completed" : "Upcoming"} workday set ${
            i + 1
          }`}
          aria-hidden="true"
          className="star"
        />
      ))}
    </div>
  );
}
