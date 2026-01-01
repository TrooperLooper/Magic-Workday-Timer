/**
 * Magic Timer - Utility Functions
 * Helper functions used across the application
 */

import { TIMER_TYPES } from "./constants";

/**
 * Determines the timer type based on duration in minutes
 * @param {number} minutes - Duration in minutes (5, 20, or 25)
 * @returns {string} Timer type: "long" (25min), "short" (5min), or "medium" (20min)
 */
export function getTimerType(minutes) {
  if (minutes === 25) {
    return TIMER_TYPES.LONG;
  } else if (minutes === 5) {
    return TIMER_TYPES.SHORT;
  } else if (minutes === 20) {
    return TIMER_TYPES.MEDIUM;
  }
  // Fallback for custom timer lengths
  return TIMER_TYPES.LONG;
}

/**
 * Safely plays audio with comprehensive error handling
 * Handles network errors, browser autoplay restrictions, and missing files
 * @param {string} audioPath - Path to audio file (e.g., "/chime.mp3")
 */
export function playAudio(audioPath) {
  try {
    const audio = new Audio(audioPath);
    
    // Attempt to play - don't wait for it
    const playPromise = audio.play();
    
    // Handle promise if browser supports it
    if (playPromise !== undefined && typeof playPromise.catch === "function") {
      playPromise.catch((error) => {
        if (error.name === "NotAllowedError") {
          console.warn("Audio playback blocked by browser autoplay policy");
        } else if (error.name === "NotSupportedError") {
          console.warn(`Audio format not supported: ${audioPath}`);
        } else {
          console.warn(`Failed to play audio: ${error.message}`);
        }
      });
    }
  } catch (error) {
    console.warn(`Error creating audio element: ${error.message}`);
  }
}

/**
 * Checks if all sets (workday) is complete
 * @param {number} completedSets - Number of completed sets
 * @param {number} maxSets - Maximum number of sets for a full workday
 * @returns {boolean} True if workday is complete
 */
export function isWorkdayComplete(completedSets, maxSets) {
  return completedSets >= maxSets;
}

/**
 * Calculates total minutes elapsed for a workday
 * Each set is approximately 2 hours 15 minutes (135 minutes)
 * @param {number} completedSets - Number of completed sets
 * @returns {number} Total minutes elapsed
 */
export function calculateElapsedMinutes(completedSets) {
  const MINUTES_PER_SET = 135; // 25+5+25+5+25+5+25+20 = 135 minutes
  return completedSets * MINUTES_PER_SET;
}

/**
 * Formats elapsed time into readable format
 * @param {number} minutes - Total minutes
 * @returns {string} Formatted time (e.g., "2h 15m")
 */
export function formatElapsedTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}

/**
 * Determines if a timer is a work or break session
 * @param {string} color - Timer color ("red" for work, "green" for break)
 * @returns {boolean} True if timer is a work session
 */
export function isWorkSession(color) {
  return color === "red";
}

/**
 * Determines if a timer is a break session
 * @param {string} color - Timer color
 * @returns {boolean} True if timer is a break session
 */
export function isBreakSession(color) {
  return color === "green";
}
