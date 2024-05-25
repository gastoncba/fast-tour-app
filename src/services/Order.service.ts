import { Order } from "../models";
import { get, post, put } from "./Fetch.service";

const SERVICE_ENDPOINT = "order";

export type CreateOrderDto = { purchaseDate: string; userId?: number; tripId: number; placesVisited: { placeId: number; hotelId: number }[]; numberPeople: number; firstName?: string; lastName?: string; email?: string; total: number };

export const OrderServices = (() => {
  const createOrder = async (newOrder: CreateOrderDto) => {
    try {
      await post(SERVICE_ENDPOINT, newOrder, false);
    } catch (error) {
      throw newError("CREATE-ORDER-FAIL", error);
    }
  };

  const getOrders = async () => {
    try {
      const orders: Order[] = await get(SERVICE_ENDPOINT);
      return orders;
    } catch (error) {
      throw newError("GET-ORDERS-FAIL");
    }
  };

  const nextState = async (orderId: number, state: string) => {
    try {
      await put(SERVICE_ENDPOINT + "/" + orderId + "/" + state, {});
    } catch (error) {
      throw newError("PUT-NEXT-STATE-FAIL", error);
    }
  };

  type OrderServiceError = "CREATE-ORDER-FAIL" | "GET-ORDERS-FAIL" | "PUT-NEXT-STATE-FAIL";

  const newError = (code: OrderServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { createOrder, getOrders, nextState };
})();
