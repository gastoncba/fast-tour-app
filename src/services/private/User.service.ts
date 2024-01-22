import { User, Token } from "../../models/index";
import { get, post, put } from "../Fetch.service";

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

  const update = (changes: { firstName?: string; lastName?: string; email?: string; brandName?: string; brandId?: string }) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await put(SERVICE_ENDPOINT + "/update", changes);
        resolve();
      } catch (error) {
        reject(newError("UPDATE-FAIL", error));
      }
    });
  };

  type UserServiceError = "LOGIN-FAIL" | "SIGN_UP-FAIL" | "RECOVER-PASSWORD-FAIL" | "CHANGE_PASSWORD-FAIL" | "UPDATE-FAIL";

  const newError = (code: UserServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { isTokenValid, signUp, login, recoverPassword, changePassword, update };
})();
