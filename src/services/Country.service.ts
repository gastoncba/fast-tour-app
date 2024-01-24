import { get, post, put } from "./Fetch.service";
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

  const createCountry = (data: { name: string; code: string }) => {
    return new Promise<Country>(async (resolve, reject) => {
      try {
        let country = await post(SERVICE_ENDPOINT, data);
        resolve(country);
      } catch (error) {
        reject(newError("POST-COUNTRY-FAIL", error));
      }
    });
  };

  const updateCountry = (countryId: number, changes: { name?: string; code?: string }) => {
    return new Promise<Country>(async (resolve, reject) => {
      try {
        let country = await put(SERVICE_ENDPOINT + "/" + countryId, changes);
        resolve(country);
      } catch (error) {
        reject(newError("PUT-COUNTRY-FAIL", error));
      }
    });
  };

  type BrandServiceError = "GET-COUNTRIES-FAIL" | "POST-COUNTRY-FAIL" | "PUT-COUNTRY-FAIL";

  const newError = (code: BrandServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getCountries, createCountry, updateCountry };
})();
