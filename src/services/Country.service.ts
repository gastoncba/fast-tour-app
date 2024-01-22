import { get } from "./Fetch.service";
import { Country } from "../models/Country.model";

const SERVICE_ENDPOINT = "countries";

export const CountryService = (() => {
  const getCountries = () => {
    return new Promise<Country[]>(async (resolve, reject) => {
      try {
        let countries = (await get(SERVICE_ENDPOINT)) as Country[];
        resolve(countries);
      } catch (error) {
        reject(newError("GET-COUNTRIES-FAIL", error));
      }
    });
  };

  type BrandServiceError = "GET-COUNTRIES-FAIL" | "GET-COUNTRY-FAIL";

  const newError = (code: BrandServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getCountries };
})();
