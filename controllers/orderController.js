const getOrder = async (req, res) => {
    try {
        const order = await Orders.find({});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        // Lấy đơn đặt hàng theo id
        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng có id là', id });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        // Lấy danh sách đơn đặt hàng của người dùng theo userId
        const orders = await Orders.find({ user: userId });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng cho người dùng có id là', userId });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalValue, products } = req.body;

        // Kiểm tra xem đơn đặt hàng có tồn tại không
        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng có id là', id });
        }

        // Kiểm tra xem các sản phẩm trong đơn đặt hàng có hợp lệ không
        const validProductIds = products.map(product => product.product);
        const validProducts = await Product.find({ _id: { $in: validProductIds } });
        if (validProducts.length !== validProductIds.length) {
            return res.status(400).json({ message: 'Một hoặc nhiều sản phẩm không hợp lệ.' });
        }

        // Cập nhật đơn đặt hàng
        const updatedOrder = await Orders.findByIdAndUpdate(id, {
            totalValue,
            products,
        }, { new: true });

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
        const { userId, totalValue, products } = req.body;

        // Kiểm tra xem userId có phải là một user hợp lệ hay không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng có id là', userId });
        }

        // Kiểm tra xem products có hợp lệ không
        const validProductIds = products.map(product => product.product);
        const validProducts = await Product.find({ _id: { $in: validProductIds } });
        if (validProducts.length !== validProductIds.length) {
            return res.status(400).json({ message: 'Một hoặc nhiều sản phẩm không hợp lệ.' });
        }

        // Tạo đơn đặt hàng mới
        const order = await Orders.create({
            user: userId,
            totalValue,
            products,
        });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getOrder,getOrderById, updateOrder,getOrdersByUserId, deleteOrder, createOrder };