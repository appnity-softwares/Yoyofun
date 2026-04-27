import { apiRequest, buildQuery } from "./api";

export const seoService = {
  // Public
  getSEO(pageSlug) {
    return apiRequest(`/seo/${pageSlug}`);
  },

  // Admin
  list(params = {}) {
    return apiRequest(`/admin/seo${buildQuery(params)}`, { auth: true });
  },

  get(id) {
    return apiRequest(`/admin/seo/${id}`, { auth: true });
  },

  getBySlug(slug) {
    return apiRequest(`/admin/seo/slug/${slug}`, { auth: true });
  },

  save(id, data) {
    if (id) {
      return apiRequest(`/admin/seo/${id}`, {
        method: "PATCH",
        auth: true,
        body: data,
      });
    }
    return apiRequest("/admin/seo", {
      method: "POST",
      auth: true,
      body: data,
    });
  },

  delete(id) {
    return apiRequest(`/admin/seo/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
