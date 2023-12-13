const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    createdDate: { 
        type: Date, 
        default: Date.now },
    totalValue:{
        type: Number,
        require: true,
    },
    items: [{
      product_id: { type: String, required: true },
      quantity: { type: Number, required: true },
      address: { type: String, required: true }
  }],

    products: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }],
    userInfo: {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      address: String,
  },
  },
  {
    timestamps: true
  });

  // Tạo model từ schema
const Orders = mongoose.model('Orders', orderSchema);

// Export model để sử dụng trong ứng dụng
module.exports = Orders;