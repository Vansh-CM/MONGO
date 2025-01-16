const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantityInStock: { type: Number, required: true },
//   category: { type: String, default: 'General' }, // Optional category field
// }, {
//   timestamps: true, // Automatically adds createdAt and updatedAt fields
// });

// const Product = mongoose.model('product', productSchema);

// module.exports = Product;


const ProductSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v); // Validate image URLs
      },
      message: (props) => `${props.value} is not a valid image URL!`,
    },
  },
  rating: {
    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 5, // Assuming ratings are on a scale of 0 to 5
    },
    count: {
      type: Number,
      required: true,
      min: 0,
    },
  },
});


module.exports = mongoose.model('Product', ProductSchema);