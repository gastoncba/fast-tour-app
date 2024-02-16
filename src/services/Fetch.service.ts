import axios from "axios";

import { tokenProvider } from "../providers/Token.provider";
import { API } from "../settings/API.setting";

// ------------ POST
/**
 *
 * @param route Path
 * @param data Body
 * @param tokenAuthRequired Token Auth
 * @param extraHeaders
 * @returns
 */
export const post = (route: string, data: {}, tokenAuthRequired: boolean = true, extraHeaders?: {}) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      let res;
      let headers = { ...extraHeaders };

      if (tokenAuthRequired) {
        let token = await tokenProvider.authToken();
        const tokenHeader = {
          Authorization: `Bearer ${token}`,
        };
        headers = { ...tokenHeader, ...headers };
      }

      const config = {
        headers: { ...headers },
      };
      res = await axios.post(API.URL + route, data, config);
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

// ------------ GET

/**
 *
 * @param route Path
 * @param query_params Query params (after path)
 * @param tokenAuthRequired Token Auth
 * @param extraHeaders
 * @param responseType
 * @returns
 */
export const get = (route: string, query_params?: string, tokenAuthRequired: boolean = true, extraHeaders?: {}, responseType?: {}) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      let res;
      let params: any = "";
      let headers = { ...extraHeaders };

      if (tokenAuthRequired) {
        let token = await tokenProvider.authToken();
        const tokenHeader = {
          Authorization: `Bearer ${token}`,
        };
        headers = { ...tokenHeader, ...headers };
      }

      if (query_params) {
        params = new URLSearchParams(query_params);
        route += "?" + params;
      }

      const config = {
        headers: { ...headers },
        ...responseType,
      };
      res = await axios.get(API.URL + route, config);
      resolve(res.data);
    } catch (error) {
      console.log("ERROR: FetchService | Post:", error);
      reject(error);
    }
  });
};

// ------------ DELETE

/**
 *
 * @param route Path
 * @param query_params Params that go after ?
 * @param tokenAuthRequired Token Auth
 * @param extraHeaders
 * @returns
 */
export const del = (route: string, data?: {}, tokenAuthRequired: boolean = true, extraHeaders?: {}) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      let res;
      let params: any = "";
      let headers = { ...extraHeaders };

      if (tokenAuthRequired) {
        let token = await tokenProvider.authToken();
        const tokenHeader = {
          Authorization: `Bearer ${token}`,
        };
        headers = { ...tokenHeader, ...headers };
      }

      const config = {
        headers: { ...headers },
        data: {
          ...data,
        },
      };

      res = await axios.delete(API.URL + route + params, config);
      resolve(res.data);
    } catch (error) {
      console.log("ERROR: FetchService | Post:", error);
      reject(error);
    }
  });
};

// ------------ PUT

/**
 *
 * @param route Path
 * @param query_params Params that go after ?
 * @param tokenAuthRequired Token Auth
 * @param extraHeaders
 * @returns
 */
export const put = (route: string, data: {}, tokenAuthRequired: boolean = true, extraHeaders?: {}) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      let res;
      let headers = { ...extraHeaders };

      if (tokenAuthRequired) {
        let token = await tokenProvider.authToken();
        const tokenHeader = {
          Authorization: `Bearer ${token}`,
        };
        headers = { ...tokenHeader, ...headers };
      }

      const config = {
        headers: { ...headers },
        data: {
          ...data,
        },
      };

      res = await axios.put(API.URL + route, data, config);
      resolve(res.data);
    } catch (error) {
      console.log("ERROR: FetchService | Post:", error);
      reject(error);
    }
  });
};
