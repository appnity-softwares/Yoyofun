import { apiRequest, buildQuery } from "./api";

export const suiteService = {
  // Public
  listPublic() {
    return apiRequest("/suites");
  },

  getBySlug(slug) {
    return apiRequest(`/suites/${slug}`);
  },

  // Admin
  adminList(params = {}) {
    return apiRequest(`/admin/suites${buildQuery(params)}`, { auth: true });
  },

  create(data) {
    return apiRequest("/admin/suites", {
      method: "POST",
      auth: true,
      body: data,
    });
  },

  update(id, data) {
    return apiRequest(`/admin/suites/${id}`, {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },

  delete(id) {
    return apiRequest(`/admin/suites/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
