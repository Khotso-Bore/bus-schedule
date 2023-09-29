import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { getBusesOnRoute } from "../services/BusService";
import { BusPosition } from "../Types/BusPositions";
import busStopIcon2 from "../assets/bus-stop-2.png";
import { Bound, Stop, Path as BusPath } from "../Types/BusRoute";

const isBusOnRoute = (
  routeBounds: Bound[],
  busPosition: BusPosition
): boolean => {
  const polyPoints = routeBounds;

  // const x = -25.96776600812863;
  // const y = 28.122686107264043;
  const x = busPosition.latitude;
  const y = busPosition.longitude;

  let inside = false;
  for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
    let xi = polyPoints[i].lat;
    let yi = polyPoints[i].lng;

    let xj = polyPoints[j].lat;
    let yj = polyPoints[j].lng;

    let intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  //console.log(inside)

  return inside;
};

interface Props {
  stops: Stop[];
  bounds: Bound[];
  path: BusPath[];
}

export const BusMap = ({ path, bounds, stops }: Props) => {
  const [busses, SetBusses] = useState<BusPosition[]>();

  useEffect(() => {
    const getBusses = async () => {
      const response = await getBusesOnRoute();
      console.log(response);
      if (response) {
        const busPositions = response.Result.busPositions.filter((x) =>
          isBusOnRoute(bounds, x)
        );
        SetBusses(busPositions);
      }
    };

    getBusses();
    const interval = setInterval(() => {
      getBusses();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[-25.97156600812863, 28.121686107264043]}
      zoom={14}
      scrollWheelZoom={true}
    >
      <Polyline
        pathOptions={{ color: "DodgerBlue", weight: 8 }}
        positions={path.map((x) => [x.lat, x.lng])}
      />
      {stops.map((stop) => (
        <Marker
          key={stop.id}
          position={[stop.lat, stop.lng]}
          icon={
            new L.Icon({
              iconUrl: busStopIcon2,
              iconSize: new L.Point(25, 25),
            })
          }
        />
      ))}
      {busses === undefined
        ? null
        : busses!.map((bus) => (
            <Marker key={bus.busId} position={[bus.latitude, bus.longitude]} />
          ))}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
