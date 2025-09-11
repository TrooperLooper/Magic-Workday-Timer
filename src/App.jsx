import React, { useState, useEffect, useRef } from "react";
import MinutesCircle from "./components/MinutesCircle";
import BigButtonDot from "./components/BigButtonDot";
import CountdownNumber from "./components/CountdownNumber";
import PillRow from "./components/PillRow";
import StarsRow from "./components/StarsRow";

const TIMER_SEQUENCE = [
  { color: "red", minutes: 25 },
  { color: "green", minutes: 5 },
  { color: "red", minutes: 25 },
  { color: "green", minutes: 5 },
  { color: "red", minutes: 25 },
  { color: "green", minutes: 5 },
  { color: "red", minutes: 25 },
  { color: "green", minutes: 20 }, // <-- medium timer, green, 20 min
];

export default function App() {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SEQUENCE[0].minutes);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const intervalRef = useRef(null);

  // Starta timer
  const handleButtonClick = () => {
    if (!isRunning && completedSets < 5) {
      setIsRunning(true);
    }
  };

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 60000); // 1 minute interval
    }
    if (timeLeft === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setCompletedSteps((prev) => prev + 1);

      // Play chime sound
      const audio = new Audio("/chime.mp3");
      audio.play();

      // When all pills are done, increment stars and reset pills
      if (completedSteps + 1 === 8) {
        setCompletedSets((prev) => prev + 1);
        setCompletedSteps(0);
        setStep(0); // Reset to first timer in sequence
        setTimeLeft(TIMER_SEQUENCE[0].minutes); // Reset timer value
        // If all stars are done, stop timer permanently
        if (completedSets + 1 === 3) {
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
      <div
        className="timer-container"
        style={{
          position: "relative",
          width: 400,
          height: 400,
          margin: "0 auto",
        }}
      >
        <MinutesCircle
          totalSeconds={currentTimer.minutes}
          secondsLeft={timeLeft}
          isRunning={isRunning}
          timerType={
            currentTimer.minutes === 25
              ? "long"
              : currentTimer.minutes === 5
              ? "short"
              : "medium"
          }
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
