import { Place } from "./Place.model";

export type Hotel = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  place?: Place
};
