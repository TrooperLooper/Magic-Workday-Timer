/**
 * Magic Timer - Application Constants
 * Centralized configuration for timer sequences, UI dimensions, and visual settings
 */

/**
 * Timer sequence for the workday
 * Represents 5 Pomodoro sets:
 * - 3 long work sessions (25 min) with short breaks (5 min)
 * - Final long break (20 min) before completing the set
 * Total per set: 2 hours
 * Total for 3 sets (MAX_SETS): ~7 hours (1 complete workday)
 */
export const TIMER_SEQUENCE = [
  { color: "red", minutes: 25, label: "Work" },
  { color: "green", minutes: 5, label: "Short Break" },
  { color: "red", minutes: 25, label: "Work" },
  { color: "green", minutes: 5, label: "Short Break" },
  { color: "red", minutes: 25, label: "Work" },
  { color: "green", minutes: 5, label: "Short Break" },
  { color: "red", minutes: 25, label: "Work" },
  { color: "green", minutes: 20, label: "Long Break" }, // Medium timer: 20 min
];

/**
 * Maximum number of completed sets (workdays)
 * 1 set = 8 timers (3 work + 3 short breaks + 1 long break) = ~2 hours
 * 3 sets = complete workday (~7 hours)
 */
export const MAX_SETS = 3; // 1 complete workday (~7 hours)

/**
 * UI Dimensions
 * MinutesCircle SVG positioning and sizing
 */
export const CIRCLE_CONFIG = {
  NUM_DOTS: 25, // Number of minute dots in the circle
  RADIUS: 100, // Distance from center to each dot
  CENTER: 200, // Center point of the 400x400 container
  DOT_SIZE: 18, // Width/height of each dot SVG
  ROTATION_OFFSET: -Math.PI / 2, // Rotate so top dot is at index 0
};

/**
 * Timer interval in milliseconds
 * Set to 60000 (1 minute) for production
 * Can be reduced to 1000 (1 second) for testing/demo
 */
export const TIMER_INTERVAL_MS = 60000; // 1 minute

/**
 * Button and SVG image paths
 * Used by BigButtonDot and other components
 */
export const IMAGE_PATHS = {
  buttons: {
    work: "/images/button_work.svg",
    break: "/images/button_break.svg",
  },
  minuteDots: {
    left: "/images/minute_left.svg",
    expired: "/images/minute_expired.svg",
    current: "/images/minute_current.svg",
  },
  pills: {
    workLong: {
      done: "/images/work_long_done.svg",
      next: "/images/work_long_next.svg",
    },
    breakShort: {
      done: "/images/break_short_done.svg",
      next: "/images/break_short_next.svg",
    },
    breakLong: {
      done: "/images/break_long_done.svg",
      next: "/images/break_long_next.svg",
    },
  },
  stars: {
    done: "/images/star_done.svg",
    next: "/images/star_next.svg",
  },
  audio: {
    chime: "/chime.mp3",
  },
};

/**
 * BigButtonDot sizing
 */
export const BUTTON_CONFIG = {
  WIDTH: 140,
  HEIGHT: 140,
};

/**
 * CountdownNumber styling
 */
export const COUNTDOWN_CONFIG = {
  FONT_SIZE: 70,
  POSITION_TOP: "48%",
  POSITION_LEFT: "49%",
  FONT_FAMILY: "Arial Black, Arial, sans-serif",
};

/**
 * PillRow sizing
 * Note: Short breaks use smaller pills (12x12)
 *       Long work/breaks use standard pills (30x30)
 */
export const PILL_CONFIG = {
  SHORT_BREAK_SIZE: 12,
  STANDARD_SIZE: 30,
  GAP: 3,
};

/**
 * Timer types for MinutesCircle logic
 * Determines countdown direction and dot display order
 */
export const TIMER_TYPES = {
  LONG: "long", // 25 minutes
  SHORT: "short", // 5 minutes
  MEDIUM: "medium", // 20 minutes (long break)
};
