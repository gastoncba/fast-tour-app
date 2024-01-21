import { get } from "./Fetch.service";
import { Trip } from "../models/Trip.model";

const SERVICE_ENDPOINT = "trips";

export const TripService = (() => {
  const getTrips = (query?: string) => {
    return new Promise<Trip[]>(async (resolve, reject) => {
      try {
        let trips = await get(SERVICE_ENDPOINT, query, false);
        resolve(trips);
      } catch (error) {
        reject(newError("GET-TRIPS-FAIL", error));
      }
    });
  };

  const getTrip = (id: number) => {
    return new Promise<Trip>(async (resolve, reject) => {
      try {
        let trip = await get(SERVICE_ENDPOINT + "/" + id, undefined, false);
        resolve(trip);
      } catch(error) {
        reject(newError("GET-TRIP-FAIL", error));
      }
    });
  };

  type BrandServiceError = "GET-TRIPS-FAIL" | "GET-TRIP-FAIL";

  const newError = (code: BrandServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getTrip, getTrips };
})();
