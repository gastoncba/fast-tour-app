import { User, Token, Order } from "../../models/index";
import { get, post, put, del } from "../Fetch.service";

const SERVICE_ENDPOINT = "users";

export const UserService = (() => {
  const isTokenValid = async (): Promise<User> => {
    return new Promise(async (resolve, reject) => {
      try {
        const user: User = (await get(SERVICE_ENDPOINT)) as User;
        resolve(user);
      } catch (error) {
        reject();
      }
    });
  };

  const signUp = (newUser: { firstName: string; lastName: string; email: string; password: string }) => {
    return new Promise<User>(async (resolve, reject) => {
      try {
        let new_user = (await post(SERVICE_ENDPOINT + "/create", { ...newUser, roleId: 2 }, false)) as User;
        resolve(new_user);
      } catch (error) {
        reject(newError("SIGN_UP-FAIL", error));
      }
    });
  };

  const login = async (email: string, password: string): Promise<{ user: User; token: Token }> => {
    const SERVICE_ENDPOINT = "auth/login";
    return new Promise<{ user: User; token: Token }>(async (resolve, reject) => {
      try {
        let userToken = (await post(SERVICE_ENDPOINT, { email, password }, false)) as { user: User; token: Token };
        resolve(userToken);
      } catch (error) {
        reject(newError("LOGIN-FAIL", error));
      }
    });
  };

  const recoverPassword = (email: string) => {
    const SERVICE_ENDPOINT = "auth/recovery";
    return new Promise<void>(async (resolve, reject) => {
      try {
        await post(SERVICE_ENDPOINT, { email }, false);
        resolve();
      } catch (error) {
        reject(newError("RECOVER-PASSWORD-FAIL", error));
      }
    });
  };

  const changePassword = (token: string, newPassword: string) => {
    const SERVICE_ENDPOINT = "auth/change-password";
    return new Promise<void>(async (resolve, reject) => {
      try {
        await post(SERVICE_ENDPOINT, { token, newPassword }, false);
        resolve();
      } catch (error) {
        reject(newError("CHANGE_PASSWORD-FAIL", error));
      }
    });
  };

  const update = (changes: { firstName?: string; lastName?: string; email?: string }) => {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const user: User = await put(SERVICE_ENDPOINT + "/update", changes);
        resolve(user);
      } catch (error) {
        reject(newError("UPDATE-FAIL", error));
      }
    });
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

  type UserServiceError = "LOGIN-FAIL" | "SIGN_UP-FAIL" | "RECOVER-PASSWORD-FAIL" | "CHANGE_PASSWORD-FAIL" | "UPDATE-FAIL" | "GET-ORDER-USER-FAIL" | "GET-USERS-ADMIN-FAIL" | "GET-USERS-ADMIN-UNAUTHORIZED" | "SEND-MESSAGE-ERROR" | "DELETE-USER-FAIL";

  const newError = (code: UserServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { sendMessage, deleteUser, isTokenValid, signUp, login, recoverPassword, changePassword, update, getOrders, getUsers };
})();
