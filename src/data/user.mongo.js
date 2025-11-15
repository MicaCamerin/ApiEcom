const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const CartDAO = require('./cart.mongo');

class UserDAO {
  async create(userData) {
    // validaciones 
    if (!userData.password) throw new Error('Password requerido');
    if (!userData.email) throw new Error('Email requerido');

    const hashedPassword = bcrypt.hashSync(userData.password, 10);

    // crear carrito y asocia al usuario
    const cart = await CartDAO.create();

    const newUser = await User.create({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      age: userData.age,
      password: hashedPassword,
      cart: cart._id,
      role: userData.role || 'user'
    });

    return newUser.toObject(); 
  }

  async getByEmail (email) {
    return User.findOne({ email }).lean();
  }

  async getById(uid) {
    return User.findById(uid).lean();
  }
}

module.exports = new UserDAO();