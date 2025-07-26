import { del, get, post, put } from "./Fetch.service";
import { Trip } from "../models/Trip.model";
import { QueryBuilder } from "../utils";

const SERVICE_ENDPOINT = "trips";

export interface PaginatedResponse<T> {
  page: number;
  items: T[];
  count: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

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

  const getTripsPaginated = (page: number = 1, limit: number = 10, query?: string) => {
    return new Promise<PaginatedResponse<Trip>>(async (resolve, reject) => {
      try {
        const queryString = QueryBuilder.buildPaginatedQuery(page, limit, query);
        let response = await get(SERVICE_ENDPOINT, queryString, false);
        resolve(response);
      } catch (error) {
        reject(newError("GET-TRIPS-PAGINATED-FAIL", error));
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

  const deleteTrip = (tripId: number) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await del(SERVICE_ENDPOINT + "/" + tripId);
        resolve();
      } catch (error) {
        reject(newError("DELETE-TRIP-FAIL", error));
      }
    });
  };

  type TripServiceError = "GET-TRIPS-FAIL" | "GET-TRIPS-PAGINATED-FAIL" | "GET-TRIP-FAIL" | "POST-TRIP-FAIL" | "PUT-TRIP-FAIL" | "DELETE-TRIP-FAIL";

  const newError = (code: TripServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getTrip, getTrips, getTripsPaginated, createTrip, updateTrip, deleteTrip };
})();
