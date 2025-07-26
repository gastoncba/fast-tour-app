import { del, get, post, put } from "./Fetch.service";
import { Country } from "../models/Country.model";
import { PaginatedResponse } from "../models";
import { QueryBuilder } from "../utils";

const SERVICE_ENDPOINT = "countries";

export const CountryService = (() => {
  const getCountries = (params?: string) => {
    return new Promise<Country[]>(async (resolve, reject) => {
      try {
        let countries = await get(SERVICE_ENDPOINT + "/all", params, false);
        resolve(countries);
      } catch (error) {
        reject(newError("GET-COUNTRIES-FAIL", error));
      }
    });
  };

  const getCountriesPaginated = (page: number = 1, limit: number = 10, query?: string) => {
    return new Promise<PaginatedResponse<Country>>(async (resolve, reject) => {
      try {
        const queryString = QueryBuilder.buildPaginatedQuery(page, limit, query);
        let response = await get(SERVICE_ENDPOINT, queryString, false);
        resolve(response);
      } catch (error) {
        reject(newError("GET-COUNTRIES-PAGINATED-FAIL", error));
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

  const deleteCountry = (countryId: number) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await del(SERVICE_ENDPOINT + "/" + countryId);
        resolve();
      } catch (error) {
        reject(newError("DELETE-COUNTRY-FAIL", error));
      }
    });
  };

  type CountryServiceError = "GET-COUNTRIES-FAIL" | "GET-COUNTRIES-PAGINATED-FAIL" | "POST-COUNTRY-FAIL" | "PUT-COUNTRY-FAIL" | "DELETE-COUNTRY-FAIL";

  const newError = (code: CountryServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getCountries, getCountriesPaginated, createCountry, updateCountry, deleteCountry };
})();
