import { get, post, put } from "./Fetch.service";
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

  type HotelServiceError = "GET-HOTELS-FAIL" | "GET-HOTEL-FAIL" | "POST-HOTELS-FAIL" | "PUT-HOTELS-FAIL";

  const newError = (code: HotelServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getHotels, getHotel };
})();
