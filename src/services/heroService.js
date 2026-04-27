import { apiRequest } from "./api";

export const heroService = {
  // Public
  list: async () => {
    return apiRequest("/hero-slides");
  },

  // Admin
  adminList: async () => {
    return apiRequest("/admin/hero-slides", { auth: true });
  },

  create: async (data) => {
    return apiRequest("/admin/hero-slides", {
      method: "POST",
      auth: true,
      body: data,
    });
  },

  update: async (id, data) => {
    return apiRequest(`/admin/hero-slides/${id}`, {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },

  delete: async (id) => {
    return apiRequest(`/admin/hero-slides/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
