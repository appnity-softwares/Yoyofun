import { apiRequest, tokenStore } from "./api";

export const authService = {
  async login(credentials) {
    const data = await apiRequest("/admin/auth/login", {
      method: "POST",
      body: credentials,
    });
    tokenStore.set(data.token);
    return data.user;
  },

  async me() {
    return apiRequest("/admin/auth/me", { auth: true });
  },

  async logout() {
    try {
      await apiRequest("/admin/auth/logout", { method: "POST", auth: true });
    } finally {
      tokenStore.clear();
    }
  },

  hasToken() {
    return Boolean(tokenStore.get());
  },
};
