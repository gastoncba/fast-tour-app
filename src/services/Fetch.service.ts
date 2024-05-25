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
export const post = async (route: string, data: Record<string, any>, tokenAuthRequired: boolean = true, extraHeaders?: Record<string, any>) => {
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
  const res = await axios.post(API.URL + route, data, config);
  return res.data;
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
export const get = async (route: string, query_params?: string, tokenAuthRequired: boolean = true, extraHeaders?: Record<string, any>, responseType?: Record<string, any>) => {
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
  const res = await axios.get(API.URL + route, config);
  return res.data;
};

// ------------ DELETE

/**
 *
 * @param route Path
 * @param data Body
 * @param tokenAuthRequired Token Auth
 * @param extraHeaders
 * @returns
 */
export const del = async (route: string, data?: Record<string, any>, tokenAuthRequired: boolean = true, extraHeaders?: Record<string, any>) => {
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

  const res = await axios.delete(API.URL + route + params, config);
  return res.data;
};

// ------------ PUT

/**
 *
 * @param route Path
 * @param data Body
 * @param tokenAuthRequired Token Auth
 * @param extraHeaders
 * @returns
 */
export const put = async (route: string, data: Record<string, any>, tokenAuthRequired: boolean = true, extraHeaders?: Record<string, any>) => {
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
  return res.data;
};
