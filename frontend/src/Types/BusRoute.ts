export interface BusRoute {
  mainDepartPoint: MainDepartPoint;
  secondaryDepartPoint: SecondaryDepartPoint;
  _id: string;
  route: string;
  routeName: string;
  stops: Stop[];
  bounds: Bound[];
  path: Path[];
}

export interface MainDepartPoint {
  name: string;
  departTimes: string[];
}

export interface SecondaryDepartPoint {
  name: string;
  departTimes: string[];
}

export interface Stop {
  id: number;
  bustStopId: string;
  street: string;
  lat: number;
  lng: number;
}

export interface Bound {
  lng: number;
  lat: number;
}

export interface Path {
  lat: number;
  lng: number;
}
