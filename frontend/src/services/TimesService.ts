import { Loc } from "../Types/Loc";
import { Route, Routes } from "../Types/Routes";
import stops from "../stops.json";
import axios from "axios";
import { BusTimes } from "../Types/BusTimes";

const getStoredRoutes = (): Route | null => {
  if (localStorage.getItem("route")) {
    const routes: Route = JSON.parse(localStorage.getItem("route")!);

    return routes;
  }

  return null;
};

export const getEstimatedTimes = async () => {
  let locations: Loc[] = [];

  stops.map((x) =>
    locations.push({
      latLng: {
        latitude: Number(x.latitude),
        longitude: Number(x.longitude),
      },
    })
  );

  const origin = { location: locations[0] };
  const destination = { location: locations.pop() };
  let intermediates: any[] = [];

  locations.slice(1).map((x) => intermediates.push({ location: x }));

  //console.log(stops);

  //console.log({ origin, intermediates, destination });

  try {
    let routes = getStoredRoutes();

    if (routes) {
      //console.log(routes);

      //console.log(origin.location.latLng.latitude === -25.996102373676173);
      //console.log("h" === "h");
      return routes;
    }

    const reponse = await axios.post<Routes>(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        origin,
        intermediates,
        destination,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "",
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.legs.distanceMeters,routes.legs.duration",
        },
      }
    );

    routes = reponse.data.routes[0];
    localStorage.setItem("route", JSON.stringify(routes));
    return routes;
  } catch (error) {
    console.log(error);
    return null;
  }
};
