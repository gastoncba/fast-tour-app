import { get } from "./Fetch.service";
import { Country } from "../models/Country.model";

const SERVICE_ENDPOINT = "countries";

export const CountryService = (() => {
  const getCountries = (query?: string) => {
    return new Promise<Country[]>(async (resolve, reject) => {
      try {
        let countries = (await get(SERVICE_ENDPOINT, query)) as Country[];
        resolve(countries);
      } catch (error) {
        reject("ERROR | GET_COUNTRIES");
      }
    });
  };

  const getPlacesOf = (id: string) => {
    return new Promise<Country>(async (resolve, reject) => {
      try {
        let countries = (await get(
          `${SERVICE_ENDPOINT}/${id}/places`
        )) as Country;
        resolve(countries);
      } catch (error) {
        reject("ERROR | GET_COUNTRY_PLACES");
      }
    });
  };

  return { getCountries, getPlacesOf };
})();
