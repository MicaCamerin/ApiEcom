const Product = require('../models/product.model');

class ProductDAO {
  async create(payload) {
    const prod = await Product.create(payload);
    return prod;
  }

  async getById(id) {
    return Product.findById(id).lean();
  }

  async delete(id) {
    return Product.findByIdAndDelete(id);
  }

  async update(id, fields) {
    return Product.findByIdAndUpdate(id, fields, { new: true }).lean();
  }

  /**
   * listProducts: soporta pagination, query y sort
   * options: { limit, page, query, sort }
   */
  async listProducts({ limit = 10, page = 1, query = null, sort = null }) {
    const filter = {};
    if (query) {
      if (query === 'available' || query === 'true' || query === 'status:true') {
        filter.status = true;
      } else if (query === 'false' || query === 'status:false') {
        filter.status = false;
      } else {
        filter.category = { $regex: new RegExp(query, 'i') };
      }
    }

    const sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;

    const skip = (page - 1) * limit;
    const [total, docs] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).sort(sortOption).skip(skip).limit(limit).lean()
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    return {
      status: 'success',
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage
    };
  }
}

module.exports = new ProductDAO();