import React, { useEffect, useState } from "react";
import loading from "../../images/loading-ready.gif";
import { useIdleTimer } from "react-idle-timer";

interface IQueuePendingBarProps {
  isText: boolean;
}

interface ICountdown {
  hours: number;
  minutes: number;
  seconds: number;
}

const QueuePendingBar = ({ isText }: IQueuePendingBarProps) => {
  const [time, setTime] = React.useState<ICountdown>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  const tick = () => {
    if (time.seconds === 59) {
      setTime({ minutes: time.minutes + 1, hours: time.hours, seconds: 0 });
    } else if (time.minutes === 59) {
      setTime({ minutes: 0, hours: time.hours + 1, seconds: 0 });
    } else {
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds + 1,
      });
    }
  };

  return (
    <>
      <div
        className={`${
          isText ? "" : "short-queue-pending-bar"
        } queue-pending-bar container-shadow`}
      >
        <div className="image-container">
          <span className="vertical-helper"></span>
          <img src={loading} />
        </div>
        {isText && (
          <div className="text-timer-container">
            <h2>
              {time.minutes}:{time.seconds}
            </h2>
            <span>Finding a person who want to talk with you</span>
          </div>
        )}
      </div>
    </>
  );
};

QueuePendingBar.defaultProps = { isText: true };

export default QueuePendingBar;
