import { Hotel } from "./Hotel.model";
import { Place } from "./Place.model";
import { State } from "./State.model";
import { Trip } from "./Trip.model";
import { User } from "./User.model";

export type PlaceVisited = {
  place: Place;
  hotel: Hotel | null;
};

export type Order = {
  id: number;
  purchaseDate: string;
  numberPeople: number;
  trip: Trip;
  user: User | null;
  placesVisited: PlaceVisited[];
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  total: number;
  state: State;
};
