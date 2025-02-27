const Order = require('../../models/Order');

const getAllOrdersOfAllUsers = async(req,res)=> {
    try {

        const orders = await Order.find({});

        if(!orders.length) {
            return res.status(404).json({
                success: false,
                message: 'Заказы не найдены'
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка'
        })
    }
}

const getOrderDetailsForAdmin = async(req,res)=> {
    try {

        const { id } = req.params;

        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: 'Заказ не найден'
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка'
        })
    }
}

const updateOrderStatus = async(req,res)=> {
    try {

        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: 'Заказ не найден'
            })
        }

        await Order.findByIdAndUpdate(id, {orderStatus});

        res.status(200).json({
            success: true,
            message: 'Статус заказа обновлен'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка'
        })
    }
}

module.exports = {getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus}