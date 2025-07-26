import { User, Token, Order, PaginatedResponse } from "../../models/index";
import { get, post, put, del } from "../Fetch.service";
import { QueryBuilder } from "../../utils";

const SERVICE_ENDPOINT = "users";

export const UserService = (() => {
  const isTokenValid = async () => {
    const user: User = await get(SERVICE_ENDPOINT);
    return user;
  };

  const signUp = async (newUser: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
      let new_user: User = await post(SERVICE_ENDPOINT + "/create", { ...newUser, roleId: 2 }, false);
      return new_user;
    } catch (error) {
      throw newError("SIGNUP-FAIL", error);
    }
  };

  const login = async (email: string, password: string) => {
    const SERVICE_ENDPOINT = "auth/login";
    try {
      let userToken: { user: User; token: Token } = await post(SERVICE_ENDPOINT, { email, password }, false);
      return userToken;
    } catch (error) {
      throw newError("LOGIN-FAIL", error);
    }
  };

  const recoverPassword = async (email: string, url: string) => {
    const SERVICE_ENDPOINT = "auth/recovery";
    try {
      await post(SERVICE_ENDPOINT, { email, url }, false);
    } catch (error) {
      throw newError("RECOVER-PASSWORD-FAIL", error);
    }
  };

  const changePassword = async (token: string, newPassword: string) => {
    const SERVICE_ENDPOINT = "auth/change-password";
    try {
      await post(SERVICE_ENDPOINT, { token, newPassword }, false);
    } catch (error) {
      throw newError("CHANGE_PASSWORD-FAIL", error);
    }
  };

  const update = async (changes: { firstName?: string; lastName?: string; email?: string }) => {
    try {
      const user: User = await put(SERVICE_ENDPOINT + "/update", changes);
      return user;
    } catch (error) {
      throw newError("UPDATE-FAIL", error);
    }
  };

  const getOrders = async (userId: number) => {
    try {
      const orders: Order[] = await get(SERVICE_ENDPOINT + "/" + userId + "/orders");
      return orders;
    } catch (error) {
      throw newError("GET-ORDER-USER-FAIL", error);
    }
  };

  const sendMessage = async (userId: number, message: string) => {
    try {
      await post(SERVICE_ENDPOINT + "/" + userId + "/send-message", { message });
    } catch (error) {
      throw newError("SEND-MESSAGE-ERROR", error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await del(SERVICE_ENDPOINT + "/" + userId);
    } catch (error) {
      throw newError("DELETE-USER-FAIL", error);
    }
  };

  const getUsers = async (isAdmin: boolean) => {
    if (!isAdmin) throw newError("GET-USERS-ADMIN-UNAUTHORIZED", { message: "Unaurhorized action" });
    try {
      const users: User[] = await get(SERVICE_ENDPOINT + "/all");
      return users;
    } catch (error) {
      throw newError("GET-USERS-ADMIN-FAIL", error);
    }
  };

  const getUsersPaginated = async (page: number = 1, limit: number = 10, query?: string, isAdmin: boolean = false) => {
    if (!isAdmin) throw newError("GET-USERS-ADMIN-UNAUTHORIZED", { message: "Unaurhorized action" });
    try {
      const queryString = QueryBuilder.buildPaginatedQuery(page, limit, query);
      let response = await get(SERVICE_ENDPOINT + "/all", queryString);
      return response as PaginatedResponse<User>;
    } catch (error) {
      throw newError("GET-USERS-PAGINATED-FAIL", error);
    }
  };

  type UserServiceError = "LOGIN-FAIL" | "SIGNUP-FAIL" | "RECOVER-PASSWORD-FAIL" | "CHANGE_PASSWORD-FAIL" | "UPDATE-FAIL" | "GET-ORDER-USER-FAIL" | "GET-USERS-ADMIN-FAIL" | "GET-USERS-ADMIN-UNAUTHORIZED" | "SEND-MESSAGE-ERROR" | "DELETE-USER-FAIL" | "GET-USERS-PAGINATED-FAIL";

  const newError = (code: UserServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { sendMessage, deleteUser, isTokenValid, signUp, login, recoverPassword, changePassword, update, getOrders, getUsers, getUsersPaginated };
})();
