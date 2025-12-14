const ticketDAO = require('../data/ticket.mongo');

class TicketRepository {
  async createTicket(ticketData) {
    return await ticketDAO.create(ticketData);
  }
}

module.exports = new TicketRepository();