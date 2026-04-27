import { apiRequest, buildQuery } from "./api";

export const galleryService = {
  // Public
  listPublic(params = {}) {
    return apiRequest(`/gallery${buildQuery(params)}`);
  },

  // Admin
  adminList(params = {}) {
    return apiRequest(`/admin/gallery${buildQuery(params)}`, { auth: true });
  },

  create(data) {
    return apiRequest("/admin/gallery", {
      method: "POST",
      auth: true,
      body: data,
    });
  },

  update(id, data) {
    return apiRequest(`/admin/gallery/${id}`, {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },

  delete(id) {
    return apiRequest(`/admin/gallery/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
