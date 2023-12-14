const Products = require('../models/Products');

const getProducts = async (req, res) => {
    try {
        const products = await Products.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductByName = async (req, res) => {
    const { productName } = req.params;

    try {
        // Sử dụng phương thức findOne để tìm sản phẩm dựa trên tên
        const product = await Products.findOne({ name: productName });

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm có tên là', productName });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getProductsByCategoryName = async (req, res) => {
    const { categoryName } = req.params;

    try {
        const products = await Products.findByCategoryName(categoryName);

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the given category name' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm có id là', id });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm với id là', id });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Products.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById,getProductsByCategoryName,getProductByName, updateProduct, deleteProduct, createProduct };