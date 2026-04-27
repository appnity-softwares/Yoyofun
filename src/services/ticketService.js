import { apiRequest } from "./api";

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
};
