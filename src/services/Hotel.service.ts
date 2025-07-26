import { del, get, post, put } from "./Fetch.service";
import { Hotel } from "../models";
import { PaginatedResponse } from "../models/Pagination.model";
import { QueryBuilder } from "../utils";

const SERVICE_ENDPOINT = "hotels";

export const HotelService = (() => {
  const getHotels = (params?: string) => {
    return new Promise<Hotel[]>(async (resolve, reject) => {
      try {
        let hotels = await get(SERVICE_ENDPOINT + "/all", params, false);
        resolve(hotels);
      } catch (error) {
        reject(newError("GET-HOTELS-FAIL"));
      }
    });
  };

  const getHotelsPaginated = (page: number = 1, limit: number = 10, query?: string) => {
    return new Promise<PaginatedResponse<Hotel>>(async (resolve, reject) => {
      try {
        const queryString = QueryBuilder.buildPaginatedQuery(page, limit, query);
        let response = await get(SERVICE_ENDPOINT, queryString, false);
        resolve(response);
      } catch (error) {
        reject(newError("GET-HOTELS-PAGINATED-FAIL", error));
      }
    });
  };

  const getHotel = (hotelId: number) => {
    return new Promise<Hotel>(async (resolve, reject) => {
      try {
        let hotel = await get(SERVICE_ENDPOINT + "/" + hotelId, undefined, false);
        resolve(hotel);
      } catch (error) {
        reject(newError("GET-HOTEL-FAIL"));
      }
    });
  };

  const createHotel = (data: { name: string; stars: number; description?: string; placeId: number }) => {
    return new Promise<Hotel>(async (resolve, reject) => {
      try {
        let hotel = await post(SERVICE_ENDPOINT, data);
        resolve(hotel);
      } catch (error) {
        reject(newError("POST-HOTEL-FAIL", error));
      }
    });
  };

  const updateHotel = (hotelId: number, changes: { name?: string; stars?: number; description?: string; placeId?: number }) => {
    return new Promise<Hotel>(async (resolve, reject) => {
      try {
        let hotel = await put(SERVICE_ENDPOINT + "/" + hotelId, changes);
        resolve(hotel);
      } catch (error) {
        reject(newError("PUT-HOTEL-FAIL", error));
      }
    });
  };

  const deleteHotel = (hotelId: number) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await del(SERVICE_ENDPOINT + "/" + hotelId);
        resolve();
      } catch (error) {
        reject(newError("DELETE-HOTEL-FAIL", error));
      }
    });
  };

  type HotelServiceError = "GET-HOTELS-FAIL" | "GET-HOTELS-PAGINATED-FAIL" | "GET-HOTEL-FAIL" | "POST-HOTEL-FAIL" | "PUT-HOTEL-FAIL" | "DELETE-HOTEL-FAIL";

  const newError = (code: HotelServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getHotels, getHotelsPaginated, getHotel, createHotel, updateHotel, deleteHotel };
})();
