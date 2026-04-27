import { apiRequest } from "./api";

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
};
