const TicketModel = require('../models/ticket.model');

class TicketDAO {
  async create(ticketData) {
    return await TicketModel.create(ticketData);
  }
}

module.exports = new TicketDAO();