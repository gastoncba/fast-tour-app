import { Country } from "./Country.model";
import { Hotel } from "./Hotel.model";

export type Place = {
  id: number;
  name: string;
  description: string | null;
  img: string | null;
  country: Country;
  hotels: Hotel[];
};
