/**
 * usePomodoro Hook
 *
 * Custom React hook that encapsulates all Pomodoro timer logic
 * Manages state for timer countdown, step progression, pills, and stars
 */

import { useState, useEffect, useRef } from "react";
import type { UsePomodoroReturn } from "../types";
import {
  TIMER_SEQUENCE,
  MAX_SETS,
  TIMER_INTERVAL_MS,
  IMAGE_PATHS,
} from "../constants";
import { playAudio } from "../utils";

export function usePomodoro(): UsePomodoroReturn {
  const [step, setStep] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_SEQUENCE[0].minutes);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [completedSets, setCompletedSets] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerStartTime = useRef<number | null>(null);

  /**
   * Start/stop button click handler
   * Only allows starting if not already running and workday isn't complete
   * User must manually click to start each cycle (no auto-start)
   */
  const handleButtonClick = (): void => {
    if (!isRunning && completedSets < MAX_SETS) {
      setIsRunning(true);
    }
  };

  /**
   * Keyboard navigation - Space key to start timer
   */
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.code === "Space") {
        event.preventDefault();
        handleButtonClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [completedSets]);

  /**
   * Timer countdown logic - uses real system time (Date.now()) instead of counting intervals
   * This ensures timer survives device sleep by calculating elapsed time from actual clock
   * Only depends on isRunning to avoid cascading re-renders
   */
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      // Initialize start time when timer begins
      if (!timerStartTime.current) {
        const totalSeconds = TIMER_SEQUENCE[step].minutes * 60;
        timerStartTime.current = Date.now() - (totalSeconds - timeLeft) * 1000;
      }

      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - timerStartTime.current!) / 1000
        );
        const totalSeconds = TIMER_SEQUENCE[step].minutes * 60;
        const newTimeLeft = Math.max(0, totalSeconds - elapsed);
        setTimeLeft(newTimeLeft);
      }, 1000);
    } else {
      // Reset start time when paused
      timerStartTime.current = null;
      clearInterval(intervalRef.current ?? undefined);
    }

    // Cleanup interval on unmount
    return () => clearInterval(intervalRef.current ?? undefined);
  }, [isRunning, step]);

  /**
   * Timer completion logic - triggered when timeLeft reaches 0
   * Uses callback pattern to access current state values
   */
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setCompletedSteps((prevCompletedSteps) => {
        // Play completion sound
        playAudio(IMAGE_PATHS.audio.chime);

        const newCompletedSteps = prevCompletedSteps + 1;

        // When all pills in current set are done, advance to next set
        if (newCompletedSteps === TIMER_SEQUENCE.length) {
          setCompletedSets((prevCompletedSets) => {
            const newCompletedSets = prevCompletedSets + 1;
            // Only reset if not at max sets
            if (newCompletedSets < MAX_SETS) {
              setStep(0);
              setTimeLeft(TIMER_SEQUENCE[0].minutes);
            }
            return newCompletedSets;
          });
          setCompletedSteps(0);
        } else {
          // Advance to next timer in current set
          setStep((prevStep) => {
            const nextStep = prevStep + 1;
            if (nextStep < TIMER_SEQUENCE.length) {
              setTimeLeft(TIMER_SEQUENCE[nextStep].minutes);
            }
            return nextStep;
          });
        }

        return newCompletedSteps;
      });
    }
  }, [timeLeft, isRunning]);

  // Get current timer configuration
  const currentTimer = TIMER_SEQUENCE[step];

  return {
    step,
    timeLeft,
    isRunning,
    completedSteps,
    completedSets,
    handleButtonClick,
    currentTimer,
  };
}
