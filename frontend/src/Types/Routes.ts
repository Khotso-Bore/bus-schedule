export interface Routes {
  routes: Route[];
}

export interface Route {
  legs: Leg[];
  distanceMeters: number;
  duration: string;
}

export interface Leg {
  distanceMeters: number;
  duration: string;
}
