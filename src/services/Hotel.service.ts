import { del, get, post, put } from "./Fetch.service";
import { Hotel } from "../models";

const SERVICE_ENDPOINT = "hotels";

export const HotelService = (() => {
  const getHotels = () => {
    return new Promise<Hotel[]>(async (resolve, reject) => {
      try {
        let hotels = await get(SERVICE_ENDPOINT);
        resolve(hotels);
      } catch (error) {
        reject(newError("GET-HOTELS-FAIL"));
      }
    });
  };

  const getHotel = (hotelId: number) => {
    return new Promise<Hotel>(async (resolve, reject) => {
      try {
        let hotel = await get(SERVICE_ENDPOINT + "/" + hotelId);
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

  const deleteHotel= (hotelId: number) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await del(SERVICE_ENDPOINT + "/" + hotelId);
        resolve();
      } catch (error) {
        reject(newError("DELETE-HOTEL-FAIL", error));
      }
    });
  };

  type HotelServiceError = "GET-HOTELS-FAIL" | "GET-HOTEL-FAIL" | "POST-HOTEL-FAIL" | "PUT-HOTEL-FAIL" | "DELETE-HOTEL-FAIL";

  const newError = (code: HotelServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getHotels, getHotel, createHotel, updateHotel, deleteHotel };
})();
