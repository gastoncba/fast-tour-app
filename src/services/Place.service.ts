import { del, get, post, put } from "./Fetch.service";
import { Place } from "../models/Place.model";

const SERVICE_ENDPOINT = "places";

export const PlaceService = (() => {
  const getPlaces = (query?: string) => {
    return new Promise<Place[]>(async (resolve, reject) => {
      try {
        let places = (await get(SERVICE_ENDPOINT, query, false)) as Place[];
        resolve(places);
      } catch (error) {
        reject(newError("GET-PLACES-FAIL", error));
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

  type PlaceServiceError = "GET-PLACES-FAIL" | "GET-PLACE-FAIL" | "POST-PLACE-FAIL" | "PUT-PLACE-FAIL" | "DELETE-PLACE-FAIL";

  const newError = (code: PlaceServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getPlaces, createPlace, getPlace, updatePlace, deletePlace };
})();
