import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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
      console.log("hello");
      const response = await getBusRoute();
      //console.log(response);
      if (response) {
        SetBusRoute(response);
      }
    })();
    console.log("hello");
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
