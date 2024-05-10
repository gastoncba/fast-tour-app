import { get, post } from "./Fetch.service";

const SERVICE_ENDPOINT = "order";

type CreateOrderDto = { purchaseDate: string; userId: number | null; tripId: number; placesVisited: { placeId: number; hotelId: number }[]; numberPeople: number; firstName?: string; lastName?: string; email?: string };

export const OrderServices = (() => {
  const createOrder = async (newOrder: CreateOrderDto) => {
    try {
      await post(SERVICE_ENDPOINT, newOrder);
    } catch (error) {
      throw newError("CREATE-ORDER-FAIL");
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
