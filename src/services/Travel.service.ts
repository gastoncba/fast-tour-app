import { get } from "./Fetch.service";
import { Travel } from "../models/Travels.model";

const SERVICE_ENDPOINT = "travels";

export const TravelService = (() => {
  const getTravels = (query?: string) => {
    return new Promise<Travel[]>(async (resolve, reject) => {
      try {
        let travels = (await get(SERVICE_ENDPOINT, query)) as Travel[];
        resolve(travels);
      } catch (error) {
        reject("ERROR | GET_TRAVELS");
      }
    });
  };

  return { getTravels };
})();
