export interface BusRoute {
  _id: Id;
  route: string;
  area: string;
  city: string;
  mainDeparturePoint: MainDeparturePoint;
  secondaryDeparturePoint: SecondaryDeparturePoint;
  stops: Stop[];
  path: number[][];
}

export interface Id {
  $oid: string;
}

export interface MainDeparturePoint {
  name: string;
  departureTimes: string[];
}

export interface SecondaryDeparturePoint {
  name: string;
  departureTimes: string[];
}

export interface Stop {
  code: string;
  street: string;
  latLng: number[];
}
