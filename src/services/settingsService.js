import { apiRequest } from "./api";

export const settingsService = {
  public() {
    return apiRequest("/settings/public");
  },

  // Admin
  adminGet() {
    return apiRequest("/admin/settings", { auth: true });
  },

  adminUpdate(data) {
    return apiRequest("/admin/settings", {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },
};
