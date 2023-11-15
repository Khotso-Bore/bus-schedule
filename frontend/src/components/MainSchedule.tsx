import { useEffect, useRef, useState } from "react";
import { MainDeparturePoint, SecondaryDeparturePoint } from "../Types/BusRoute";

const convertToSeconds = (time: string): number => {
  const arr = time.split(":");
  arr[2] = "00";
  const seconds = Number(arr[0]) * 3600 + Number(arr[1]) * 60 + Number(arr[2]);
  return seconds;
};

const highlight = (departureTimes: string[]): number => {
  const currentTime = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date());

  const currentTimeinSeconds = convertToSeconds(currentTime);

  if (departureTimes.length == 0) return 0;

  if (currentTimeinSeconds <= convertToSeconds(departureTimes[0])) return 0;

  // console.log(
  //   currentTimeinSeconds >=
  //     convertToSeconds(departureTimes[departureTimes.length - 1])
  // );

  if (
    currentTimeinSeconds >=
    convertToSeconds(departureTimes[departureTimes.length - 1])
  )
    return departureTimes.length - 1;

  for (let index = 1; index < departureTimes.length; index++) {
    if (
      currentTimeinSeconds > convertToSeconds(departureTimes[index - 1]) &&
      currentTimeinSeconds <= convertToSeconds(departureTimes[index])
    ) {
      console.log(departureTimes[index - 1]);
      console.log(departureTimes[index]);
      return index;
    }
  }

  return 0;
};

interface Props {
  mainDepartPoint: MainDeparturePoint;
  secondaryDepratPoint: SecondaryDeparturePoint;
}

export const MainSchedule = ({
  mainDepartPoint,
  secondaryDepratPoint,
}: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [mainIndex, setMainIndex] = useState(0);
  const [secondaryIndex, setSecondaryIndex] = useState(0);

  useEffect(() => {
    const a = highlight(mainDepartPoint.departureTimes);
    const b = highlight(secondaryDepratPoint.departureTimes);

    setMainIndex(a);
    setSecondaryIndex(b);

    const interval = setInterval(() => {
      const a = highlight(mainDepartPoint.departureTimes);
      const b = highlight(secondaryDepratPoint.departureTimes);

      console.log(b);
      setMainIndex(a);
      setSecondaryIndex(b);
    }, 1000 * 60 * 2);

    divRef.current!.scrollTo({
      top: (a - 1) * 24,
      behavior: "instant",
    });

    return () => clearInterval(interval);
  }, [divRef]);

  useEffect(() => {
    const a = highlight(mainDepartPoint.departureTimes);
    const b = highlight(secondaryDepratPoint.departureTimes);

    setMainIndex(a);
    setSecondaryIndex(b);

    divRef.current!.scrollTo({
      top: (a - 1) * 24,
      behavior: "instant",
    });

    // return () => clearInterval(interval);
  }, [mainDepartPoint]);

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
            {mainDepartPoint.departureTimes!.map((time, index) => (
              <p
                key={index}
                className={` ${
                  mainIndex == index ? "bg-green-200" : "bg-none"
                }`}
              >
                {time}
              </p>
            ))}
          </div>
          <div>
            {secondaryDepratPoint.departureTimes!.map((time, index) => (
              <p
                key={index}
                className={` ${
                  secondaryIndex == index ? "bg-green-200" : "bg-none"
                }`}
              >
                {time}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
