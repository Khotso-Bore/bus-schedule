import { BusPositions } from "../Types/BusPositions";
import axios from "axios";
import { BusRoute } from "../Types/BusRoute";
import * as Realm from "realm-web";

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

// export const getBusRoute = async (city: string, area: string) => {
//   try {
//     const reponse: AxiosResponse<BusRoute> = await axios.get<BusRoute>(
//       `${
//         import.meta.env.VITE_API_URL
//       }/busroutes/route?city=${city}&area=${area}`
//     );

//     const busRoute = reponse.data;

//     return busRoute;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getBusRoute = async (city: string, area: string) => {
  try {
    const app = new Realm.App({ id: import.meta.env.VITE_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);

    const result = await user.functions.getBusRoute(city, area);
    //console.log(result);

    const busRoute = result as BusRoute;

    console.log(busRoute);

    return busRoute;
  } catch (error) {
    console.error(error);
  }
};
