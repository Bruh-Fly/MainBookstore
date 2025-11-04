// models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  email: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('Cart', CartSchema);
