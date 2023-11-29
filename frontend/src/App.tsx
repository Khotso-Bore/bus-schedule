import "./App.css";
import { BusMap } from "./components/BusMap";
import { MainSchedule } from "./components/MainSchedule";
import { useEffect, useState } from "react";
import { BusRoute } from "./Types/BusRoute";
import { getBusRoute } from "./services/BusService";
import Select from "react-select";

function App() {
  const [busRoute, SetBusRoute] = useState<BusRoute>();
  const [city, setCity] = useState("Midrand");
  const [area, setArea] = useState("Noordwyk");

  const stations = [
    {
      city: "Midrand",
      latLng: [-25.995422983347027, 28.1359387563011],
      areas: ["Noordwyk", "Randjespark", "Sunninghill", "mall of africa"],
    },
    {
      city: "Centurion",
      latLng: [-25.851703936077403, 28.189615067815687],
      areas: [
        "Rooihuiskraal",
        "Techno Park",
        "Southdowns",
        "Wierdapark",
        "Highveld",
        "Midstream",
      ],
    },
    {
      city: "Hatfield",
      latLng: [-25.746644695069936, 28.23931115432058],
      areas: ["Arcadia", "Brooklyn", "Lynnwood", "Menlyn", "Queenswood"],
    },
    {
      city: "Park",
      latLng: [-26.194812299621333, 28.042511625499476],
      areas: ["CBD", "Parktown"],
    },
    {
      city: "Pretoria",
      latLng: [-25.759117962291562, 28.19019196781267],
      areas: ["CBD", "Zoo"],
    },
    {
      city: "Rhodesfield",
      latLng: [-26.12798788479639, 28.22503272549707],
      areas: ["Emperors Palace", "Kempton Park CBD", "Kempton Park Express"],
    },
    {
      city: "Rosebank",
      latLng: [-26.147179529926458, 28.045109412006106],
      areas: ["Hyde Park", "Illovo", "Killaney", "Melose Arch"],
    },
    {
      city: "Sandton",
      latLng: [-26.10769179415422, 28.05726319666034],
      areas: ["Fourways", "Gallo Manor", "Randburg", "Rivonia"],
    },
    {
      city: "Marlboro",
      latLng: [-26.083303651687363, 28.11096623898717],
      areas: [
        "Kelvin",
        "Buccleuch",
        "Lakeside",
        "Linbro",
        "Greenstone",
        "Woodlands Office Park",
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await getBusRoute(city, area);
      if (response) {
        SetBusRoute(response);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log("hello area");
      const response = await getBusRoute(city, area);
      if (response) {
        SetBusRoute(response);
      }
    })();
  }, [area]);

  return (
    <>
      {busRoute ? (
        <div className="flex flex-col items-center  gap-2">
          <Select
            className="w-3/4 mt-6"
            options={stations.map((x) => ({ value: x.city, label: x.city }))}
            defaultValue={{ value: city, label: city }}
            onChange={(e) => {
              setCity(e?.value!);
            }}
          />
          <Select
            className="w-3/4"
            options={stations
              .find((x) => x.city == city)
              ?.areas.map((x) => ({ value: x, label: x }))}
            defaultValue={{ value: area, label: area }}
            onChange={(e) => {
              setArea(e?.value!);
            }}
          />
          <MainSchedule
            mainDepartPoint={busRoute!.mainDeparturePoint}
            secondaryDepratPoint={busRoute!.secondaryDeparturePoint}
          />
          <BusMap
            stops={busRoute!.stops}
            stationCoordinates={stations.find((x) => x.city == city)?.latLng!}
            path={busRoute!.path}
            station={city}
          />
        </div>
      ) : (
        <div>Loading Data...</div>
      )}
    </>
  );
}

export default App;
