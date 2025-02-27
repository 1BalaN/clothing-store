const express = require('express');
const { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } = require('../../controllers/admin/order-controller');


const router = express.Router();

router.post('/get', getAllOrdersOfAllUsers);
router.post('/details/:id', getOrderDetailsForAdmin);
router.put('/update/:id', updateOrderStatus);


module.exports = router;