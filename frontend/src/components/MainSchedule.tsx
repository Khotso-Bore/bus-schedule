import { useEffect, useRef, useState } from "react";
import { MainDepartPoint, SecondaryDepartPoint } from "../Types/BusRoute";

let itemIndex = 0;

const convertToSeconds = (time: string): number => {
  const arr = time.split(":");
  const seconds = Number(arr[0]) * 3600 + Number(arr[1]) * 60 + Number(arr[2]);
  return seconds;
};

const getCurrentTimeInterval = (currentTimeinSeconds: number): number => {
  if (currentTimeinSeconds <= convertToSeconds("09:30:00")) return 10;

  if (
    currentTimeinSeconds > convertToSeconds("09:30:00") &&
    currentTimeinSeconds <= convertToSeconds("15:30:00")
  )
    return 20;

  if (
    currentTimeinSeconds > convertToSeconds("15:30:00") &&
    currentTimeinSeconds <= convertToSeconds("19:30:00")
  )
    return 10;

  return 20;
};

const highlight = (deprtTime: string): boolean => {
  const currentTime = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date());

  const currentTimeinSeconds = convertToSeconds(currentTime);
  const departTimeinSeconds = convertToSeconds(deprtTime);

  if (
    currentTimeinSeconds >
      departTimeinSeconds - getCurrentTimeInterval(currentTimeinSeconds) * 60 &&
    currentTimeinSeconds <= departTimeinSeconds
  ) {
    return true;
  }

  return false;
};

interface Props {
  mainDepartPoint: MainDepartPoint;
  secondaryDepratPoint: SecondaryDepartPoint;
}

export const MainSchedule = ({
  mainDepartPoint,
  secondaryDepratPoint,
}: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [mainIndex, setMainIndex] = useState(0);
  const [secondaryIndex, setSecondaryIndex] = useState(0);

  useEffect(() => {
    const a = mainDepartPoint.departTimes!.findIndex((time) => highlight(time));
    const b = secondaryDepratPoint.departTimes!.findIndex((time) =>
      highlight(time)
    );

    setMainIndex(a);
    setSecondaryIndex(b);

    const interval = setInterval(() => {
      const a = mainDepartPoint.departTimes!.findIndex((time) =>
        highlight(time)
      );
      const b = secondaryDepratPoint.departTimes!.findIndex((time) =>
        highlight(time)
      );

      setMainIndex(a);
      setSecondaryIndex(b);
    }, 1000 * 60 * 2);

    divRef.current!.scrollTo({
      top: (b - 2) * 24,
      behavior: "instant",
    });

    return () => clearInterval(interval);
  }, [divRef]);

  return (
    <div>
      <p className="text-xl">Scheduled Depart Times:</p>
      <div className="grid grid-cols-2">
        <p>{mainDepartPoint.name}</p>
        <p>{secondaryDepratPoint.name}</p>
        <div
          ref={divRef}
          className="col-span-2 grid grid-cols-2 h-24 overflow-y-scroll"
        >
          <div>
            {mainDepartPoint.departTimes!.map((time, index) => (
              <p
                key={index}
                className={` ${
                  mainIndex == index ? "bg-green-200" : "bg-none"
                }`}
              >
                {time.slice(0, -3)}
              </p>
            ))}
          </div>
          <div>
            {secondaryDepratPoint.departTimes!.map((time, index) => (
              <p
                key={index}
                className={` ${
                  secondaryIndex == index ? "bg-green-200" : "bg-none"
                }`}
              >
                {time.slice(0, -3)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
