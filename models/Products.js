const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Bạn chưa đặt tên sản phẩm',
    },
    description:{
        type: String,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ProductCategory', 
    },


},
{
    timestamps: true
});

// Tạo model từ schema
const Products = mongoose.model('Products', productSchema);

// Export model để sử dụng trong ứng dụng
module.exports = Products;