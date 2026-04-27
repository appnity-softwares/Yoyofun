const API_BASE_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");
const TOKEN_KEY = "yoyo_admin_token";

export class APIError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.errors = errors;
  }
}

export const tokenStore = {
  get() {
    return localStorage.getItem(TOKEN_KEY);
  },
  set(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export async function apiRequest(path, options = {}) {
  const { auth = false, body, headers = {}, ...rest } = options;
  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  const token = tokenStore.get();
  if (auth && token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  let requestBody = body;
  if (body && !(body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    body: requestBody,
    headers: requestHeaders,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : null;

  if (response.status === 401 && auth) {
    tokenStore.clear();
    window.dispatchEvent(new Event("yoyo-admin-unauthorized"));
  }

  if (!response.ok || payload?.success === false) {
    throw new APIError(payload?.message || "Request failed.", response.status, payload?.errors);
  }

  return payload?.data ?? payload;
}

export function buildQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });
  const text = query.toString();
  return text ? `?${text}` : "";
}

export function formatINRFromPaise(amount = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(Number(amount) / 100));
}

export function formatINR(amount = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}
