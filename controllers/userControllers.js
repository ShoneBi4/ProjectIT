const Users = require('../models/users');

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
        res.status(200).json(user);
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
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser, createUser };