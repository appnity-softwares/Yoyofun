import { apiRequest, buildQuery } from "./api";

export const hallService = {
  // Public
  listPackages() {
    return apiRequest("/halls/packages");
  },

  submitEnquiry(data) {
    return apiRequest("/halls/enquiries", {
      method: "POST",
      body: data,
    });
  },

  // Admin
  adminListPackages() {
    return apiRequest("/admin/halls/packages", { auth: true });
  },

  createPackage(data) {
    return apiRequest("/admin/halls/packages", {
      method: "POST",
      auth: true,
      body: data,
    });
  },

  updatePackage(id, data) {
    return apiRequest(`/admin/halls/packages/${id}`, {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },

  deletePackage(id) {
    return apiRequest(`/admin/halls/packages/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },

  // Enquiries
  listEnquiries(params = {}) {
    return apiRequest(`/admin/halls/enquiries${buildQuery(params)}`, { auth: true });
  },

  updateEnquiry(id, data) {
    return apiRequest(`/admin/halls/enquiries/${id}`, {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },
};
