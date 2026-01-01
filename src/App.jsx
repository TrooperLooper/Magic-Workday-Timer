import React, { useState, useEffect, useRef } from "react";
import MinutesCircle from "./components/MinutesCircle";
import BigButtonDot from "./components/BigButtonDot";
import CountdownNumber from "./components/CountdownNumber";
import PillRow from "./components/PillRow";
import StarsRow from "./components/StarsRow";
import { TIMER_SEQUENCE, MAX_SETS, TIMER_INTERVAL_MS, IMAGE_PATHS } from "./constants";
import { getTimerType, playAudio } from "./utils";
import "./App.css";

export default function App() {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SEQUENCE[0].minutes);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const intervalRef = useRef(null);

  // Start timer
  const handleButtonClick = () => {
    if (!isRunning && completedSets < MAX_SETS) {
      setIsRunning(true);
    }
  };

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, TIMER_INTERVAL_MS);
    }
    if (timeLeft === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setCompletedSteps((prev) => prev + 1);

      // Play chime sound
      playAudio(IMAGE_PATHS.audio.chime);

      // When all pills are done, increment stars and reset pills
      if (completedSteps + 1 === TIMER_SEQUENCE.length) {
        setCompletedSets((prev) => prev + 1);
        setCompletedSteps(0);
        setStep(0); // Reset to first timer in sequence
        setTimeLeft(TIMER_SEQUENCE[0].minutes); // Reset timer value
        // If all stars are done, stop timer permanently
        if (completedSets + 1 === MAX_SETS) {
          setIsRunning(false);
        }
        // Do NOT automatically start the timer for the next set
      } else if (step < TIMER_SEQUENCE.length - 1) {
        setStep((prev) => prev + 1);
        setTimeLeft(TIMER_SEQUENCE[step + 1].minutes);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, step, completedSteps, completedSets]);

  // Get current timer info
  const currentTimer = TIMER_SEQUENCE[step];

  return (
    <div>
      <div className="timer-container">
        <MinutesCircle
          totalSeconds={currentTimer.minutes}
          secondsLeft={timeLeft}
          isRunning={isRunning}
          timerType={getTimerType(currentTimer.minutes)}
        />
        <BigButtonDot
          color={currentTimer.color}
          isRunning={isRunning}
          onClick={handleButtonClick}
        >
          <CountdownNumber value={timeLeft} />
        </BigButtonDot>
      </div>
      <PillRow completedSteps={completedSteps} />
      <StarsRow completedSets={completedSets} />
    </div>
  );
}
