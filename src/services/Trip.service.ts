import { get, post, put } from "./Fetch.service";
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
      } catch (error) {
        reject(newError("GET-TRIP-FAIL", error));
      }
    });
  };

  const createTrip = (data: { name: string; description?: string; price: number; startDate: string; endDate: string; img?: string; placesId: number[] }) => {
    return new Promise<Trip>(async (resolve, reject) => {
      try {
        let trip = await post(SERVICE_ENDPOINT, data);
        resolve(trip);
      } catch (error) {
        reject(newError("POST-TRIP-FAIL", error));
      }
    });
  };

  const updateTrip = (tripId: number, changes: { name?: string; description?: string; price?: number; startDate?: string; endDate?: string; img?: string; placesId?: number[] }) => {
    return new Promise<Trip>(async (resolve, reject) => {
      try {
        let trip = await put(SERVICE_ENDPOINT + "/" + tripId, changes);
        resolve(trip);
      } catch (error) {
        reject(newError("POST-TRIP-FAIL", error));
      }
    });
  };

  type BrandServiceError = "GET-TRIPS-FAIL" | "GET-TRIP-FAIL" | "POST-TRIP-FAIL" | "PUT-TRIP-FAIL";

  const newError = (code: BrandServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getTrip, getTrips, createTrip, updateTrip };
})();
