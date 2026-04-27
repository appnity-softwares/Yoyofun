import { apiRequest, buildQuery } from "./api";

export const restaurantService = {
  // Public
  listItems(params = {}) {
    return apiRequest(`/restaurant/items${buildQuery(params)}`);
  },

  // Admin
  adminListItems(params = {}) {
    return apiRequest(`/admin/restaurant/items${buildQuery(params)}`, { auth: true });
  },

  createItem(data) {
    return apiRequest("/admin/restaurant/items", {
      method: "POST",
      auth: true,
      body: data,
    });
  },

  updateItem(id, data) {
    return apiRequest(`/admin/restaurant/items/${id}`, {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },

  deleteItem(id) {
    return apiRequest(`/admin/restaurant/items/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
