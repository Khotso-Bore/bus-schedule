import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { getBusesOnRoute } from "../services/BusService";
import { BusPosition } from "../Types/BusPositions";
import busStopIcon2 from "../assets/bus-stop-2.png";
import busIcon from "../assets/busIcon4.png";
import { Stop } from "../Types/BusRoute";

interface Props {
  stops: Stop[];
  stationCoordinates: number[];
  path: number[][];
}

interface ChangeViewProps {
  center: number[];
  zoom: number;
}

export const BusMap = ({ path, stationCoordinates, stops }: Props) => {
  const [busses, SetBusses] = useState<BusPosition[]>();
  const [mapCenter, SetMapCenter] = useState([0, 0]);

  useEffect(() => {
    //console.log("hello mapsa");
    //minimap.setView([-25.746644695069936, 28.23931115432058]);
    const getBusses = async () => {
      const response = await getBusesOnRoute();
      console.log(response);
      if (response) {
        const busPositions = response.Result.busPositions;

        // .filter((x) => {
        //   if (bounds) isBusOnRoute(bounds, x);
        // });
        SetBusses(busPositions);
      }
    };

    getBusses();
    const interval = setInterval(() => {
      getBusses();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const ChangeView = ({ center, zoom }: ChangeViewProps) => {
    const map = useMap();

    const oldCenter = mapCenter[0];
    //console.log(oldCenter, center[0]);
    if (oldCenter != center[0]) {
      SetMapCenter([center[0], center[1]]);
      map.setView([center[0], center[1]], zoom);
    }
    return null;
  };

  return (
    <MapContainer
      className="z-0"
      center={[stationCoordinates[0], stationCoordinates[1]]}
      zoom={14}
      scrollWheelZoom={true}
    >
      <ChangeView
        center={[stationCoordinates[0], stationCoordinates[1]]}
        zoom={14}
      />
      <Polyline
        pathOptions={{ color: "DodgerBlue", weight: 8 }}
        positions={path.map((x) => [x[1], x[0]])}
      />
      {stops.map((stop) => (
        <Marker
          key={stop.code}
          position={[stop.latLng[0], stop.latLng[1]]}
          icon={
            new L.Icon({
              iconUrl: busStopIcon2,
              iconSize: new L.Point(25, 25),
            })
          }
        >
          <Popup>
            {stop.code}
            <br></br>
            {stop.street}
          </Popup>
        </Marker>
      ))}
      {busses === undefined
        ? null
        : busses!.map((bus) => (
            <Marker
              key={bus.busId}
              position={[bus.latitude, bus.longitude]}
              icon={
                new L.Icon({
                  iconUrl: busIcon,
                  iconSize: new L.Point(25, 25),
                })
              }
            />
          ))}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
