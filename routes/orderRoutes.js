const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController');

router.get('/', orderController.getOrder);
router.get('/:id', orderController.getOrderById);
router.get('/:userId', orderController.getOrdersByUserId);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.post('/', orderController.createOrder);

module.exports = router