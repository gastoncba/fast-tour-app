import { get } from "./Fetch.service";
import { Place } from "../models/Place.model";

const SERVICE_ENDPOINT = "places";

export const PlaceService = (() => {
  const getPlaces = (query?: string) => {
    return new Promise<Place[]>(async (resolve, reject) => {
      try {
        let places = (await get(SERVICE_ENDPOINT, query)) as Place[];
        resolve(places);
      } catch (error) {
        reject("ERROR | GET_PLACES");
      }
    });
  };

  const getTravelsOf = (id: string) => {
    return new Promise<Place>(async (resolve, reject) => {
      try {
        let place = (await get(`${SERVICE_ENDPOINT}/${id}/travels`)) as Place
        resolve(place)
      } catch {
        reject("ERROR | GET_TRAVELS_PLACES")
      }
    })
  }

  return { getPlaces, getTravelsOf };
})();
