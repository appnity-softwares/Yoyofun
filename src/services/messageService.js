import { apiRequest, buildQuery } from "./api";

export const messageService = {
  // Public
  submit(data) {
    return apiRequest("/contact", {
      method: "POST",
      body: data,
    });
  },

  // Admin
  adminList(params = {}) {
    return apiRequest(`/admin/messages${buildQuery(params)}`, { auth: true });
  },

  adminDetail(id) {
    return apiRequest(`/admin/messages/${id}`, { auth: true });
  },

  updateStatus(id, status) {
    return apiRequest(`/admin/messages/${id}/status`, {
      method: "PATCH",
      auth: true,
      body: { status },
    });
  },

  delete(id) {
    return apiRequest(`/admin/messages/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
