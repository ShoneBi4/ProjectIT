const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  totalValue: {
    type: Number,
    required: true,
  },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },  // Update the reference to 'Products'
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  userInfo: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    username: String,
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