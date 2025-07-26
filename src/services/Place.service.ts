import { del, get, post, put } from "./Fetch.service";
import { Place } from "../models/Place.model";
import { PaginatedResponse } from "../models";
import { QueryBuilder } from "../utils";

const SERVICE_ENDPOINT = "places";

export const PlaceService = (() => {
  const getPlaces = (query?: string) => {
    return new Promise<Place[]>(async (resolve, reject) => {
      try {
        let places = (await get(SERVICE_ENDPOINT + "/all", query, false)) as Place[];
        resolve(places);
      } catch (error) {
        reject(newError("GET-PLACES-FAIL", error));
      }
    });
  };

  const getPlacesPaginated = (page: number = 1, limit: number = 10, query?: string) => {
    return new Promise<PaginatedResponse<Place>>(async (resolve, reject) => {
      try {
        const queryString = QueryBuilder.buildPaginatedQuery(page, limit, query);
        let response = await get(SERVICE_ENDPOINT, queryString, false);
        resolve(response);
      } catch (error) {
        reject(newError("GET-PLACES-PAGINATED-FAIL", error));
      }
    });
  };

  const getPlace = (placeId: number) => {
    return new Promise<Place>(async (resolve, reject) => {
      try {
        let place = await get(SERVICE_ENDPOINT + "/" + placeId);
        resolve(place);
      } catch (error) {
        reject(newError("GET-PLACE-FAIL", error));
      }
    });
  };

  const createPlace = (data: { name: string; description?: string; img?: string; countryId: number }) => {
    return new Promise<Place>(async (resolve, reject) => {
      try {
        let place = await post(SERVICE_ENDPOINT, data);
        resolve(place);
      } catch (error) {
        reject(newError("POST-PLACE-FAIL", error));
      }
    });
  };

  const updatePlace = (placeId: number, changes: { name?: string; code?: string }) => {
    return new Promise<Place>(async (resolve, reject) => {
      try {
        let place = await put(SERVICE_ENDPOINT + "/" + placeId, changes);
        resolve(place);
      } catch (error) {
        reject(newError("PUT-PLACE-FAIL", error));
      }
    });
  };

  const deletePlace = (placeId: number) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await del(SERVICE_ENDPOINT + "/" + placeId);
        resolve();
      } catch (error) {
        reject(newError("DELETE-PLACE-FAIL", error));
      }
    });
  };

  type PlaceServiceError = "GET-PLACES-FAIL" | "GET-PLACES-PAGINATED-FAIL" | "GET-PLACE-FAIL" | "POST-PLACE-FAIL" | "PUT-PLACE-FAIL" | "DELETE-PLACE-FAIL";

  const newError = (code: PlaceServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getPlaces, getPlacesPaginated, createPlace, getPlace, updatePlace, deletePlace };
})();
