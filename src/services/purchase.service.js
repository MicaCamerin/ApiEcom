const cartRepository = require('../repositories/cart.repository');
const productRepository = require('../repositories/product.repository');
const ticketRepository = require('../repositories/ticket.repository');
const { v4: uuidv4 } = require('uuid');

class PurchaseService {
  async purchaseCart(cartId, userEmail) {
    const cart = await cartRepository.getById(cartId);

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    let totalAmount = 0;
    const productsWithoutStock = [];

    for (const item of cart.products) {
      const product = await productRepository.getById(item.product._id);

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        totalAmount += product.price * item.quantity;
        await productRepository.update(product._id, product);
      } else {
        productsWithoutStock.push(item);
      }
    }

    // Eliminar del carrito los productos comprados
    cart.products = productsWithoutStock;
    await cartRepository.update(cartId, cart);

    if (totalAmount === 0) {
      return {
        status: 'failed',
        productsWithoutStock
      };
    }

    const ticket = await ticketRepository.createTicket({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: userEmail
    });

    return {
      status: 'success',
      ticket,
      productsWithoutStock
    };
  }
}

module.exports = new PurchaseService();