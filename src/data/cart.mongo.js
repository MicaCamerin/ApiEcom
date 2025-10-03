const Cart = require('../models/cart.model');
const mongoose = require('mongoose');

class CartDAO {
  async create() {
    const cart = await Cart.create({ products: [] });
    return cart;
  }

  async getById(cid) {
    return Cart.findById(cid).populate('products.product').lean();
  }

  async addProductToCart(cid, productId) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const prodIndex = cart.products.findIndex(p => p.product.toString() === productId.toString());
    if (prodIndex !== -1) {
      cart.products[prodIndex].quantity += 1;
    } else {
      cart.products.push({ product: mongoose.Types.ObjectId(productId), quantity: 1 });
    }

    await cart.save();
    return Cart.findById(cid).populate('products.product').lean();
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    cart.products = cart.products.filter(p => p.product.toString() !== pid.toString());
    await cart.save();
    return cart;
  }

  async updateCartProducts(cid, productsArray) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    cart.products = productsArray.map(p => ({
      product: mongoose.Types.ObjectId(p.product),
      quantity: p.quantity
    }));
    await cart.save();
    return Cart.findById(cid).populate('products.product').lean();
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    const item = cart.products.find(p => p.product.toString() === pid.toString());
    if (!item) return null;
    item.quantity = quantity;
    await cart.save();
    return Cart.findById(cid).populate('products.product').lean();
  }

  async emptyCart(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    cart.products = [];
    await cart.save();
    return cart;
  }
}

module.exports = new CartDAO();