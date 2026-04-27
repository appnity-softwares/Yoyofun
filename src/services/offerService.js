import { apiRequest, buildQuery } from "./api";

export const offerService = {
  // Public
  listActive() {
    return apiRequest("/offers/active");
  },

  // Admin
  adminList(params = {}) {
    return apiRequest(`/admin/offers${buildQuery(params)}`, { auth: true });
  },

  create(data) {
    return apiRequest("/admin/offers", {
      method: "POST",
      auth: true,
      body: data,
    });
  },

  update(id, data) {
    return apiRequest(`/admin/offers/${id}`, {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },

  delete(id) {
    return apiRequest(`/admin/offers/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
