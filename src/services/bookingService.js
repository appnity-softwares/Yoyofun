import { apiRequest, buildQuery } from "./api";

export const bookingService = {
  createOrder(payload) {
    return apiRequest("/bookings/create-order", {
      method: "POST",
      body: payload,
    });
  },

  verifyPayment(payload) {
    return apiRequest("/bookings/verify-payment", {
      method: "POST",
      body: payload,
    });
  },

  // Admin
  adminList(params = {}) {
    return apiRequest(`/admin/bookings${buildQuery(params)}`, { auth: true });
  },

  adminDetail(id) {
    return apiRequest(`/admin/bookings/${id}`, { auth: true });
  },

  updateStatus(id, status) {
    return apiRequest(`/admin/bookings/${id}/status`, {
      method: "PATCH",
      auth: true,
      body: { status },
    });
  },
};
