const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Bạn chưa đặt tên',
  },
  numPhone: { 
    type: String, 
    require: true,
  },
  email: { 
    type: String, 
    require: true, 
  },
  password: { 
    type: String,
    required: true, 
  },
  address: {  // <-- Add a colon here
    type: String,
    require: 'Bạn chưa nhập địa chỉ',
  }
}, 
{
  timestamps: true
});

// Tạo model từ schema
const Users = mongoose.model('Users', userSchema);

// Export model để sử dụng trong ứng dụng
module.exports = Users;