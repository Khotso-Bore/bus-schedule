import "./App.css";
import { BusMap } from "./components/BusMap";
import { MainSchedule } from "./components/MainSchedule";
import { useEffect, useState } from "react";
import { BusRoute } from "./Types/BusRoute";
import { getBusRoute } from "./services/BusService";

function App() {
  const [busRoute, SetBusRoute] = useState<BusRoute>();

  useEffect(() => {
    (async () => {
      const response = await getBusRoute();
      if (response) {
        SetBusRoute(response);
      }
    })();
  }, []);

  return (
    <>
      {busRoute ? (
        <div className="flex flex-col items-center gap-2">
          <MainSchedule
            mainDepartPoint={busRoute!.mainDepartPoint}
            secondaryDepratPoint={busRoute!.secondaryDepartPoint}
          />
          <BusMap
            stops={busRoute!.stops}
            bounds={busRoute!.bounds}
            path={busRoute!.path}
          />
        </div>
      ) : (
        <div>gettping bus data</div>
      )}
    </>
  );
}

export default App;
