import { apiRequest, buildQuery } from "./api";

function normalizeTicket(ticket) {
  const features = Array.isArray(ticket.features) ? ticket.features : [];
  return {
    ...ticket,
    name: ticket.title,
    features,
  };
}

export const ticketService = {
  async list() {
    const tickets = await apiRequest("/tickets");
    return tickets.map(normalizeTicket);
  },

  async detail(slug) {
    const ticket = await apiRequest(`/tickets/${slug}`);
    return normalizeTicket(ticket);
  },

  // Admin
  async adminList(params = {}) {
    return apiRequest(`/admin/tickets${buildQuery(params)}`, { auth: true });
  },

  async adminDetail(id) {
    return apiRequest(`/admin/tickets/${id}`, { auth: true });
  },

  async create(data) {
    return apiRequest("/admin/tickets", {
      method: "POST",
      auth: true,
      body: data,
    });
  },

  async update(id, data) {
    return apiRequest(`/admin/tickets/${id}`, {
      method: "PATCH",
      auth: true,
      body: data,
    });
  },

  async delete(id) {
    return apiRequest(`/admin/tickets/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },

  async toggleStatus(id) {
    return apiRequest(`/admin/tickets/${id}/toggle-status`, {
      method: "PATCH",
      auth: true,
    });
  },
};
