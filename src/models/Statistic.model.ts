import { Country } from "./Country.model";
import { Place } from "./Place.model";
import { Trip } from "./Trip.model";

export type GeneralStatistic = {
  orders: number;
  users: number;
  averageSales: number;
};

type TotalSales = {
  sales_total: number;
};

export type TripRanking = Trip & TotalSales;

export type PlaceRanking = Place & TotalSales;

export type CountryRanking = Country & TotalSales;

export type Ranking = {
  tripRanking: TripRanking[];
  placeRanking: PlaceRanking[];
  countryRanking: CountryRanking[];
};
