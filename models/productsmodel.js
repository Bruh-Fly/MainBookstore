const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  isFeatured: Boolean,
  variants: [String], // dùng cho gift card hoặc lựa chọn khác
});

module.exports = mongoose.model('Product', ProductSchema);
