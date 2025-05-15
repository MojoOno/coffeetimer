import { useState, useEffect } from "react";
import styles from "../components/Timer.module.css";

import logo from "../assets/newlogo.svg";
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import reset from "../assets/reset.svg";
import coffee0 from "../assets/coffeecup_empty.svg";
import coffee25 from "../assets/coffeecup_25.svg";
import coffee50 from "../assets/coffeecup_50.svg";
import coffee75 from "../assets/coffeecup_75.svg";
import coffee100 from "../assets/coffeecup_100.svg";

const cups = [coffee0, coffee25, coffee50, coffee75, coffee100];

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [currentCup, setCurrentCup] = useState(4);

  useEffect(() => {
    let interval = null;

    function calcRemainingTime() {
      const remainingTime = (time / totalTime) * 100;
      if (remainingTime > 75.0) return 4;
      if (remainingTime > 50.0) return 3;
      if (remainingTime > 25.0) return 2;
      if (remainingTime > 0.0) return 1;
      return 0;
    }

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
        const remainingTime = calcRemainingTime();
        if (remainingTime !== currentCup) {
          setCurrentCup(remainingTime);
        }
      }, 1000);
    } else if (isActive && time === 0) {
      clearInterval(interval);
      setCurrentCup(0);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time, currentCup, totalTime]);

  const startTimer = () => {
    setIsActive(true);
    if (time === 0) {
      setTime(minutes * 60 + seconds);
      setTotalTime(minutes * 60 + seconds);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
    setMinutes(0);
    setSeconds(0);
  };

  const fixTimer = (mins) => {
    setMinutes(mins);
    setSeconds(0);
    setIsActive(true);
    setTime(mins * 60);
    setTotalTime(mins * 60);
  };

  const formatTime = (time) => {
    const m = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const s = (time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} width="200" src={logo} alt="Logo" />

      <h1>Coffee timer</h1>

      <img
        className={styles.coffeecup}
        width="100"
        src={cups[currentCup]}
        alt="Coffee Cup"
      />

      <div className={styles["remaining-time"]}>{formatTime(time)}</div>

      <div className={styles["timer-controls"]}>
        <div className={styles["play-buttons"]}>
          {isActive ? (
            <button className={styles.btn} onClick={pauseTimer}>
              <img src={pause} alt="Pause" width="32" height="32" />
            </button>
          ) : (
            <button className={styles.btn} onClick={startTimer}>
              <img src={play} alt="Start" width="32" height="32" />
            </button>
          )}
          <button className={styles.btn} onClick={resetTimer}>
            <img src={reset} alt="Reset" width="20" height="20" />
          </button>
        </div>

        <div className={styles["input-boxes"]}>
          <div className={styles["time-input"]}>
            <label htmlFor="minutes">Minutes</label>
            <input
              type="number"
              min={0}
              max={59}
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className={styles["time-input"]}>
            <label htmlFor="seconds">Seconds</label>
            <input
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

        <div className={styles.buttons}>
          <button className={styles.btn} onClick={() => fixTimer(5)}>
            5 mins
          </button>
          <button className={styles.btn} onClick={() => fixTimer(10)}>
            10 mins
          </button>
          <button className={styles.btn} onClick={() => fixTimer(15)}>
            15 mins
          </button>
        </div>
    </div>
  );
}

export default Timer;
