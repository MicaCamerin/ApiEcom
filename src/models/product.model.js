const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  code: { type: String, default: '' },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  category: { type: String, default: '' },
  thumbnails: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);