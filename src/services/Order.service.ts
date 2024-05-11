import { get, post } from "./Fetch.service";

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
      await get(SERVICE_ENDPOINT);
    } catch (error) {
      throw newError("GET-ORDERS-FAIL");
    }
  };

  type OrderServiceError = "CREATE-ORDER-FAIL" | "GET-ORDERS-FAIL";

  const newError = (code: OrderServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { createOrder, getOrders };
})();
