const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

const login = async (req, res) => {
  const { numPhone, password } = req.body;

  try {
    // Tìm người dùng theo số điện thoại
    const user = await Users.findOne({ numPhone: numPhone });

    if (!user) {
      return res.status(400).json({ message: 'Người dùng không tồn tại' });
    }

    // So sánh mật khẩu trực tiếp (không mã hóa)
    if (password === user.password) {
      // Tạo token JWT nếu mật khẩu hợp lệ
      const token = jwt.sign({ id: user._id, numPhone: user.numPhone }, secretKey);
      res.json({ message: 'Đăng nhập thành công', token });
    } else {
      // Trả về thông báo mật khẩu không hợp lệ
      res.status(400).json({ message: 'Mật khẩu không hợp lệ' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
  
    try {
      const user = await Users.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        res.status(200).json({ user, message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng có id là', id });
        }
        const updatedUser = await Users.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng có id là', id });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(200).json({ user, message: 'Xóa thành công' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, getUserById,getUserByUsername, updateUser, deleteUser, createUser,login };