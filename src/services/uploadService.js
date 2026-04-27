import { apiRequest, buildQuery } from "./api";

export const uploadService = {
  upload(file, folder = "general") {
    const formData = new FormData();
    formData.append("file", file);
    return apiRequest(`/admin/uploads?folder=${folder}`, {
      method: "POST",
      auth: true,
      body: formData,
    });
  },

  listMedia(params = {}) {
    return apiRequest(`/admin/media${buildQuery(params)}`, { auth: true });
  },

  deleteMedia(id) {
    return apiRequest(`/admin/media/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
