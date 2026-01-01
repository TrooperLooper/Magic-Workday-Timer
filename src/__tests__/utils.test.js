/**
 * Test Suite: Utility Functions
 * Tests for helper functions in src/utils.js
 */

import {
  getTimerType,
  playAudio,
  isWorkdayComplete,
  calculateElapsedMinutes,
  formatElapsedTime,
  isWorkSession,
  isBreakSession,
} from "../utils";
import { TIMER_TYPES, MAX_SETS } from "../constants";

describe("getTimerType()", () => {
  test("should return LONG for 25 minute timer", () => {
    expect(getTimerType(25)).toBe(TIMER_TYPES.LONG);
  });

  test("should return SHORT for 5 minute timer", () => {
    expect(getTimerType(5)).toBe(TIMER_TYPES.SHORT);
  });

  test("should return MEDIUM for 20 minute timer", () => {
    expect(getTimerType(20)).toBe(TIMER_TYPES.MEDIUM);
  });

  test("should return LONG as fallback for unknown duration", () => {
    expect(getTimerType(15)).toBe(TIMER_TYPES.LONG);
    expect(getTimerType(30)).toBe(TIMER_TYPES.LONG);
  });
});

describe("playAudio()", () => {
  test("should create Audio instance with correct path", async () => {
    const audioSpy = jest.spyOn(global, "Audio");
    await playAudio("/chime.mp3");
    expect(audioSpy).toHaveBeenCalledWith("/chime.mp3");
    audioSpy.mockRestore();
  });

  test("should call play() on audio instance", async () => {
    const mockPlay = jest.fn();
    global.Audio.mockImplementation(() => ({
      play: mockPlay,
    }));
    
    await playAudio("/chime.mp3");
    expect(mockPlay).toHaveBeenCalled();
  });

  test("should handle audio playback errors gracefully", async () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
    global.Audio.mockImplementation(() => ({
      play: jest.fn().mockRejectedValue(new Error("Audio failed")),
    }));
    
    // Should not throw
    await playAudio("/invalid.mp3");
    expect(consoleWarnSpy).toHaveBeenCalled();
    
    consoleWarnSpy.mockRestore();
  });
});

describe("isWorkdayComplete()", () => {
  test("should return false when no sets are completed", () => {
    expect(isWorkdayComplete(0, MAX_SETS)).toBe(false);
  });

  test("should return false when some sets are completed", () => {
    expect(isWorkdayComplete(1, MAX_SETS)).toBe(false);
    expect(isWorkdayComplete(2, MAX_SETS)).toBe(false);
  });

  test("should return true when all sets are completed", () => {
    expect(isWorkdayComplete(MAX_SETS, MAX_SETS)).toBe(true);
  });

  test("should return true when sets exceed maximum", () => {
    expect(isWorkdayComplete(MAX_SETS + 1, MAX_SETS)).toBe(true);
  });
});

describe("calculateElapsedMinutes()", () => {
  test("should return 0 for 0 completed sets", () => {
    expect(calculateElapsedMinutes(0)).toBe(0);
  });

  test("should return ~135 minutes per completed set", () => {
    expect(calculateElapsedMinutes(1)).toBe(135);
    expect(calculateElapsedMinutes(2)).toBe(270);
    expect(calculateElapsedMinutes(3)).toBe(405); // ~7 hours
  });
});

describe("formatElapsedTime()", () => {
  test("should format minutes only when less than 60", () => {
    expect(formatElapsedTime(30)).toBe("30m");
    expect(formatElapsedTime(59)).toBe("59m");
  });

  test("should format hours only when minutes are 0", () => {
    expect(formatElapsedTime(60)).toBe("1h");
    expect(formatElapsedTime(120)).toBe("2h");
  });

  test("should format hours and minutes", () => {
    expect(formatElapsedTime(75)).toBe("1h 15m");
    expect(formatElapsedTime(135)).toBe("2h 15m");
    expect(formatElapsedTime(405)).toBe("6h 45m");
  });

  test("should handle 0 minutes", () => {
    expect(formatElapsedTime(0)).toBe("0m");
  });
});

describe("isWorkSession()", () => {
  test("should return true for red (work) color", () => {
    expect(isWorkSession("red")).toBe(true);
  });

  test("should return false for green (break) color", () => {
    expect(isWorkSession("green")).toBe(false);
  });

  test("should return false for other colors", () => {
    expect(isWorkSession("blue")).toBe(false);
    expect(isWorkSession("yellow")).toBe(false);
  });
});

describe("isBreakSession()", () => {
  test("should return true for green (break) color", () => {
    expect(isBreakSession("green")).toBe(true);
  });

  test("should return false for red (work) color", () => {
    expect(isBreakSession("red")).toBe(false);
  });

  test("should return false for other colors", () => {
    expect(isBreakSession("blue")).toBe(false);
    expect(isBreakSession("yellow")).toBe(false);
  });
});
