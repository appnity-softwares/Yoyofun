import { apiRequest, buildQuery } from "./api";

export const adminService = {
  dashboardStats() {
    return apiRequest("/admin/dashboard/stats", { auth: true });
  },

  tickets(params) {
    return apiRequest(`/admin/tickets${buildQuery(params)}`, { auth: true });
  },

  createTicket(payload) {
    return apiRequest("/admin/tickets", { method: "POST", auth: true, body: payload });
  },

  updateTicket(id, payload) {
    return apiRequest(`/admin/tickets/${id}`, { method: "PATCH", auth: true, body: payload });
  },

  deleteTicket(id) {
    return apiRequest(`/admin/tickets/${id}`, { method: "DELETE", auth: true });
  },

  toggleTicketStatus(id) {
    return apiRequest(`/admin/tickets/${id}/toggle-status`, { method: "PATCH", auth: true });
  },

  bookings(params) {
    return apiRequest(`/admin/bookings${buildQuery(params)}`, { auth: true });
  },

  booking(id) {
    return apiRequest(`/admin/bookings/${id}`, { auth: true });
  },

  updateBookingStatus(id, status) {
    return apiRequest(`/admin/bookings/${id}/status`, {
      method: "PATCH",
      auth: true,
      body: { status },
    });
  },

  messages(params) {
    return apiRequest(`/admin/messages${buildQuery(params)}`, { auth: true });
  },

  message(id) {
    return apiRequest(`/admin/messages/${id}`, { auth: true });
  },

  updateMessageStatus(id, status) {
    return apiRequest(`/admin/messages/${id}/status`, {
      method: "PATCH",
      auth: true,
      body: { status },
    });
  },

  deleteMessage(id) {
    return apiRequest(`/admin/messages/${id}`, { method: "DELETE", auth: true });
  },

  settings() {
    return apiRequest("/admin/settings", { auth: true });
  },

  updateSettings(payload) {
    return apiRequest("/admin/settings", { method: "PATCH", auth: true, body: payload });
  },

  users(params) {
    return apiRequest(`/admin/users${buildQuery(params)}`, { auth: true });
  },

  createUser(payload) {
    return apiRequest("/admin/users", { method: "POST", auth: true, body: payload });
  },

  updateUser(id, payload) {
    return apiRequest(`/admin/users/${id}`, { method: "PATCH", auth: true, body: payload });
  },

  deleteUser(id) {
    return apiRequest(`/admin/users/${id}`, { method: "DELETE", auth: true });
  },

  auditLogs(params) {
    return apiRequest(`/admin/audit-logs${buildQuery(params)}`, { auth: true });
  },
};
