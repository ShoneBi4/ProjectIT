const Orders = require('../models/Orders');
const User = require('../models/Users');  // Đảm bảo bạn đã đặt tên đúng cho model User
const Product = require('../models/Products');

const getOrder = async (req, res) => {
    try {
        const orders = await Orders.find({}, {
            totalValue: 1,
            items: 1,
            userInfo: 1,
            _id: 1  // Bật trường _id để lấy orderId
        })
            .populate('userInfo.user')  // Populate thông tin người dùng
            .populate('items.product_id');  // Populate thông tin sản phẩm

        // Chuyển đổi dữ liệu để đạt được định dạng mong muốn
        const formattedOrders = orders.map(order => {
            return {
                orderId: order._id.toString(),  // Thêm orderId vào đối tượng
                userId: order.userInfo.user._id.toString(),
                totalValue: order.totalValue,
                items: order.items.map(item => ({
                    product_id: item.product_id._id.toString(),
                    productName: item.product_id.name,
                    quantity: item.quantity
                })),
                userInfo: {
                    username: order.userInfo.username,
                    address: order.userInfo.address
                }
            };
        });

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Orders.findById(id)
            .populate('userInfo.user')
            .populate('items.product_id');

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng có id là', id });
        }

        // Chuyển đổi dữ liệu để đạt được định dạng mong muốn
        const formattedOrder = {
            orderId: order._id.toString(),
            userId: order.userInfo.user._id.toString(),
            totalValue: order.totalValue,
            items: order.items.map(item => ({
                product_id: item.product_id._id.toString(),
                productName: item.product_id.name,
                quantity: item.quantity
            })),
            userInfo: {
                username: order.userInfo.username,
                address: order.userInfo.address
            }
        };

        res.status(200).json(formattedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; // Lấy userId từ đường dẫn

        const orders = await Orders.find({
            'userInfo.user': userId
        }, {
            totalValue: 1,
            items: 1,
            userInfo: 1,
            _id: 1
        })
        .populate('userInfo.user')
        .populate('items.product_id');

        // Chuyển đổi dữ liệu để đạt được định dạng mong muốn
        const formattedOrders = orders.map(order => {
            return {
                orderId: order._id.toString(),
                userId: order.userInfo.user._id.toString(),
                totalValue: order.totalValue,
                items: order.items.map(item => ({
                    product_id: item.product_id._id.toString(),
                    productName: item.product_id.name,
                    quantity: item.quantity
                })),
                userInfo: {
                    username: order.userInfo.username,
                    address: order.userInfo.address
                }
            };
        });

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalValue, products } = req.body;

        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng có id là', id });
        }

        const validProductIds = products.map(product => product.product);
        const validProducts = await Product.find({ _id: { $in: validProductIds } });
        if (validProducts.length !== validProductIds.length) {
            return res.status(400).json({ message: 'Một hoặc nhiều sản phẩm không hợp lệ.' });
        }

        const updatedOrder = await Orders.findByIdAndUpdate(id, {
            totalValue,
            products,
        }, { new: true }).populate('user').populate('items.product_id');

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        // Kiểm tra xem đơn đặt hàng có tồn tại không
        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng có id là', id });
        }
        // Xóa đơn đặt hàng
        await Orders.findByIdAndDelete(id);

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const { totalValue, items } = req.body;
        const userId = req.body.userId;

        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findById(userId, { _id: 1, username: 1, address: 1 });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng có id là', userId });
        }

        // Kiểm tra xem các sản phẩm trong đơn đặt hàng có hợp lệ không
        const validProductIds = items.map(item => item.product_id);
        const validProducts = await Product.find({ _id: { $in: validProductIds } });
        if (validProducts.length !== validProductIds.length) {
            return res.status(400).json({ message: 'Một hoặc nhiều sản phẩm không hợp lệ.' });
        }

        // Tạo đơn đặt hàng mới
        const order = await Orders.create({
            totalValue,
            items: items.map(item => ({
                product_id: item.product_id,
                productName: item.productName,
                quantity: item.quantity,
            })),
            userInfo: {
                user: userId,
                username: user.username,  // Sử dụng thông tin từ người dùng
                address: user.address,    // Sử dụng thông tin từ người dùng
            },
        });

        // Trả về định dạng mong muốn
        const response = {
            userId: user._id.toString(),
            orderId: order._id.toString(),
            totalValue,
            items,
            userInfo: {
                username: user.username,  // Sử dụng thông tin từ người dùng
                address: user.address,    // Sử dụng thông tin từ người dùng
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getOrder,getOrderById, updateOrder,getOrdersByUserId, deleteOrder, createOrder };