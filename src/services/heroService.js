import { apiRequest } from "./api";

export const heroService = {
  // Public
  list: async () => {
    return apiRequest("/hero-slides");
  },

  // Admin
  adminList: async () => {
    return apiRequest("/admin/hero-slides");
  },

  create: async (data) => {
    return apiRequest("/admin/hero-slides", {
      method: "POST",
      body: data,
    });
  },

  update: async (id, data) => {
    return apiRequest(`/admin/hero-slides/${id}`, {
      method: "PATCH",
      body: data,
    });
  },

  delete: async (id) => {
    return apiRequest(`/admin/hero-slides/${id}`, {
      method: "DELETE",
    });
  },
};
