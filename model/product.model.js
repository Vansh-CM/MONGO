const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantityInStock: { type: Number, required: true },
  category: { type: String, default: 'General' }, // Optional category field
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;