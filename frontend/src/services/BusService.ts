import { BusPositions } from "../Types/BusPositions";
import axios, { AxiosResponse } from "axios";
import { BusRoute } from "../Types/BusRoute";

export const getBusesOnRoute = async () => {
  try {
    const reponse = await axios.post<BusPositions>(
      "https://api.gautrain.co.za/transport-api/api/0/busses/location",
      {
        east: "28.9414",
        south: "-26.3258",
        north: "-25.0488",
        west: "27.6591",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const busPositions = reponse.data;

    return busPositions;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBusRoute = async () => {
  try {
    const reponse: AxiosResponse<BusRoute> = await axios.get<BusRoute>(
      "http://localhost:4000/api/busroutes"
    );

    const busRoute = reponse.data;

    console.log("fthfhf");

    return busRoute;
  } catch (error) {
    console.error(error);
  }
};
