// import { useEffect, useState } from "react";
// import stopsJson from "../stops.json";
// import { Stop } from "../Types/Stops";
// import { getEstimatedTimes } from "../services/TimesService";
// import { Route } from "../Types/Routes";
// import departTimesJson from "../real-depart-times.json";
// import { BusTimes } from "../Types/BusTimes";

// const departTimes: BusTimes = JSON.parse(JSON.stringify(departTimesJson));
// const stops: Stop[] = JSON.parse(JSON.stringify(stopsJson));

// const convertHHmmssToSeconds = (timeInHHmmss: string): number => {
//   const arr = timeInHHmmss.split(":");
//   const seconds = Number(arr[0]) * 3600 + Number(arr[1]) * 60 + Number(arr[2]);
//   return seconds;
// };

// const convertSecondsToHHmmss = (timeInSeconds: number): string => {
//   const date = new Date(0);
//   date.setSeconds(timeInSeconds);
//   return date.toLocaleTimeString("en-GB", {
//     timeZone: "UTC",
//   });
// };

// const getCurrentTimeInterval = (currentTimeinSeconds: number): number => {
//   if (currentTimeinSeconds <= convertHHmmssToSeconds("09:30:00")) return 10;

//   if (
//     currentTimeinSeconds > convertHHmmssToSeconds("09:30:00") &&
//     currentTimeinSeconds <= convertHHmmssToSeconds("15:30:00")
//   )
//     return 20;

//   if (
//     currentTimeinSeconds > convertHHmmssToSeconds("15:30:00") &&
//     currentTimeinSeconds <= convertHHmmssToSeconds("19:30:00")
//   )
//     return 10;

//   return 20;
// };

// const getMainDepartTimes = (): { station: string; vodaworld: string } => {
//   const currentTime = new Intl.DateTimeFormat("default", {
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//     hour12: false,
//   }).format(new Date());

//   const currentTimeinSeconds = convertHHmmssToSeconds(currentTime);
//   //console.log("MAIN DEPART TIME");

//   const station =
//     departTimes.Station.filter((time) => {
//       const departTimeinSeconds = convertHHmmssToSeconds(time);
//       const currentTimeIntervalInSeconds =
//         getCurrentTimeInterval(currentTimeinSeconds) * 60;

//       if (
//         currentTimeinSeconds >
//           departTimeinSeconds - currentTimeIntervalInSeconds &&
//         currentTimeinSeconds <= departTimeinSeconds
//       ) {
//         return time;
//       }
//     }).pop() ?? "";

//   const vodaworld =
//     departTimes.Vodaworld.filter((time) => {
//       const departTimeinSeconds = convertHHmmssToSeconds(time);
//       const currentTimeIntervalInSeconds =
//         getCurrentTimeInterval(currentTimeinSeconds) * 60;

//       if (
//         currentTimeinSeconds >
//           departTimeinSeconds - currentTimeIntervalInSeconds &&
//         currentTimeinSeconds <= departTimeinSeconds
//       ) {
//         return time;
//       }
//     }).pop() ?? "";

//   return { station, vodaworld };
// };

// const getCurrentDepartTime = (
//   fromStation: boolean,
//   durationInSeconds: number
// ): { stopTime1: string; stopTime2: string; stopTime3: string } => {
//   const currentTime = new Intl.DateTimeFormat("default", {
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//     hour12: false,
//   }).format(new Date());

//   const currentTimeIntervalInSeconds =
//     getCurrentTimeInterval(convertHHmmssToSeconds(currentTime)) * 60;

//   const departTimeinSeconds = fromStation
//     ? convertHHmmssToSeconds(getMainDepartTimes().station)
//     : convertHHmmssToSeconds(getMainDepartTimes().vodaworld);

//   console.log(durationInSeconds);
//   const stopTime1 = convertSecondsToHHmmss(
//     departTimeinSeconds + durationInSeconds - currentTimeIntervalInSeconds
//   );

//   const stopTime2 = convertSecondsToHHmmss(
//     departTimeinSeconds + durationInSeconds
//   );

//   const stopTime3 = convertSecondsToHHmmss(
//     departTimeinSeconds + durationInSeconds + currentTimeIntervalInSeconds
//   );

//   console.log(stopTime1);
//   return { stopTime1, stopTime2, stopTime3 };
// };

// export const BusStop = () => {
//   const [time, setTime] = useState<{ stopTime1: string; stopTime2: string }>();
//   const [busRoute, SetBusRoute] = useState<Route>();

//   const getETA = (
//     id: number
//   ): { stopTime1: string; stopTime2: string; stopTime3: string } => {
//     if (busRoute === null)
//       return {
//         stopTime1: "",
//         stopTime2: "",
//         stopTime3: "",
//       };

//     console.log(`id is ${id}`);

//     console.log(busRoute);

//     if (id === 1) return getCurrentDepartTime(true, 120);

//     if (id > 1 && id < 13) {
//       return getCurrentDepartTime(
//         true,
//         120 +
//           busRoute!.legs
//             .slice(0, id - 1)
//             .reduce(
//               (total, leg) => total + Number(leg.duration.slice(0, -1)),
//               0
//             )
//       );
//     }

//     return getCurrentDepartTime(
//       false,
//       busRoute!.legs
//         .slice(12, id - 1)
//         .reduce((total, leg) => total + Number(leg.duration.slice(0, -1)), 0)
//     );
//   };

//   useEffect(() => {
//     const getRouteTimes = async () => {
//       const routesTimes = await getEstimatedTimes();
//       if (routesTimes !== null) {
//         SetBusRoute(routesTimes);
//       }
//     };

//     getRouteTimes();
//   }, []);

//   useEffect(() => {
//     setTime(getETA(1));
//   }, [busRoute]);

//   console.log(stops);

//   return (
//     <div className="flex flex-col items-center gap-2">
//       <label htmlFor="stops">Bus stop:</label>
//       <select
//         className="border-2 border-gray-300 px-2"
//         name="stops"
//         id="stops"
//         onChange={(e) => setTime(getETA(Number(e.target.value)))}
//       >
//         {stops.map((stop) => (
//           <option key={stop.id} value={stop.id}>
//             {stop.bustStopId}
//           </option>
//         ))}
//       </select>
//       <p className="text-xl font-bold text-gray-300">ETA:</p>
//       <div className="bg-blue-500 text-white w-32 text-center text-lg ">
//         {time?.stopTime1}
//       </div>
//       <div className="bg-blue-500 text-white w-32 text-center text-lg ">
//         {time?.stopTime2}
//       </div>
//       <div className="bg-blue-500 text-white w-32 text-center text-lg ">
//         {time?.stopTime3}
//       </div>
//     </div>
//   );
// };
