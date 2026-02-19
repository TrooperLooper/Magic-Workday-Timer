import React from "react";
import MinutesCircle from "./components/MinutesCircle";
import BigButtonDot from "./components/BigButtonDot";
import CountdownNumber from "./components/CountdownNumber";
import PillRow from "./components/PillRow";
import StarsRow from "./components/StarsRow";
import { getTimerType } from "./utils";
import { usePomodoro } from "./hooks/usePomodoro";
import "./App.css";

export default function App(): React.ReactElement {
  const {
    step,
    timeLeft,
    isRunning,
    completedSteps,
    completedSets,
    handleButtonClick,
    currentTimer,
  } = usePomodoro();

  return (
    <>
      <div className="app-wrapper">
        <div className="timer-wrapper">
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
      </div>
      <footer className="app-footer">
        <p className="footer-title">MAGIC WORKDAY TIMER</p>
        <p className="footer-credit">made by Lars Munck 2025 ©</p>
      </footer>
    </>
  );
}
