import { apiRequest } from "./api";

export const contentService = {
  // Public
  getBySlug(slug) {
    return apiRequest(`/content/${slug}`);
  },

  // Admin
  adminList() {
    return apiRequest("/admin/content", { auth: true });
  },

  adminGetBySlug(slug) {
    return apiRequest(`/admin/content/${slug}`, { auth: true });
  },

  adminUpdate(slug, data) {
    return apiRequest(`/admin/content/${slug}`, {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },
};
