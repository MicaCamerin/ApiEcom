const UserDAO = require('../data/user.mongo');

class UserRepository {
  create(userData) {
    return UserDAO.create(userData);
  }

  getByEmail(email) {
    return UserDAO.getByEmail(email);
  }

  getById(id) {
    return UserDAO.getById(id);
  }
}

module.exports = new UserRepository();