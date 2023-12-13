const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    }
  });

  // Tạo model từ schema
const Category = mongoose.model('Category', CategorySchema);

// Export model để sử dụng trong ứng dụng
module.exports = Category;