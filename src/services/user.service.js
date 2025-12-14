const userRepository = require('../repositories/user.repository');

class UserService {
  async registerUser(userData) {
    const existingUser = await userRepository.getByEmail(userData.email);
    if (existingUser) {
      throw new Error('Usuario ya existente');
    }

    return userRepository.create(userData);
  }

  async loginUser(email) {
    return userRepository.getByEmail(email);
  }

  async getUserById(id) {
    return userRepository.getById(id);
  }
}

module.exports = new UserService();