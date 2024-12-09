import axios from "axios";

import TokenService from "./service-token";

const THREE_MINUTES = 3 * 60 * 1000;
export const baseURL = import.meta.env.VITE_APP_BACKEND_API;

/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */
const RealStateHttpClient = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});

/**
 * Pass Integito API Key in Header
 */
RealStateHttpClient.interceptors.request.use(async (config) => {
  const token = TokenService.getToken()?.token;
  if (config && config.headers) {
    if (token && config.headers["Authorization"] !== "") {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (config.headers["Authorization"] === "") {
      delete config.headers["Authorization"];
    }
  }
  return config;
});

export { RealStateHttpClient };

export function toFormData(data: Record<string, any>) {
  const formData = new FormData();
  buildFormData(formData, data);

  return formData;
}

function buildFormData(
  formData: FormData,
  data: Record<string, any>,
  parentKey?: string
) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof Blob)
  ) {
    if (Array.isArray(data)) {
      // Handle arrays (e.g., multiple files), but skip if the field expects a single file
      data.forEach((item, index) => {
        buildFormData(formData, item, `${parentKey}[${index}]`);
      });
    } else {
      // Handle objects
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    }
  } else if (parentKey) {
    // Handle single file (Blob) or simple data
    const value =
      data instanceof Date ? data.toISOString().split("T")[0] : data;

    // If the value is a file, ensure it's treated as a single entry
    if (value instanceof Blob) {
      formData.append(parentKey, value); // No need for [0] indexing
    } else if (value) {
      formData.append(parentKey, value); // Handle normal text fields
    }
  }
}
