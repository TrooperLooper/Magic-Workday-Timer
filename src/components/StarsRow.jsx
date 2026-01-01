import React from "react";
import { MAX_SETS, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";

export default function StarsRow({ completedSets }) {
  return (
    <div className="stars-row">
      {[...Array(MAX_SETS)].map((_, i) => (
        <img
          key={i}
          src={
            i < completedSets
              ? IMAGE_PATHS.stars.done
              : IMAGE_PATHS.stars.next
          }
          onError={handleImageError}
          alt={`Star ${i + 1}`}
          style={{ width: 35, height: 35 }}
        />
      ))}
    </div>
  );
}
