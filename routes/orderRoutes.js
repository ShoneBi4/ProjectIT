const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController');

router.get('/order', orderController.getOrder);
router.get('/order/:id', orderController.getOrderById);
router.put('/order/:id', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);
router.post('/order', orderController.createOrder);

module.exports = router