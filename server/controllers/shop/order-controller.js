const paypal = require('../../helpers/paypal');
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

const createOrder = async(req, res) => {
    try {

        const { 
            userId, 
            cartItems, 
            addressInfo, 
            orderStatus, 
            paymentMethod, 
            paymentStatus, 
            totalAmount, 
            orderDate, 
            orderUpdateDate, 
            paymentId, 
            payerId, 
            cartId,
        } = req.body;

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel',
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item)=>({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2),
                    },
                    description: 'description',
                },
            ],
        };

        paypal.payment.create(create_payment_json, async(error, paymentInfo) => {
            if(error) {
                console.log(error);
                
                return res.status(500).json({
                    success: false,
                    message: 'Ошибка создания платежа PayPal',
                });
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                });

                await newlyCreatedOrder.save();

                const approvalURL = paymentInfo.links.find(
                    (link) => link.rel === 'approval_url'
                ).href;

                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id
                })
            }
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка, статус 500'
        })
    }
}

const capturePayment = async(req, res) => {
    try {

        const {paymentId, payerId, orderId} = req.body

        let order = await Order.findById(orderId)

        if(!order) {
            return res.status(404).json({
                success: false,
                message: 'Заказ не найден'
            })
        }

        order.paymentStatus = 'Оплачено';
        order.orderStatus = 'В ожидании';
        order.paymentId = paymentId;
        order.payerId = payerId;

        for(let item of order.cartItems) {
            let product = await Product.findById(item.productId);

            if(!product) {
                return res.status(404).json({
                    success: false,
                    message: `Недостаточно товара: ${product.title} на складе`,
                })
            }

            product.totalStock -= item.quantity;

            await product.save();
        }

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);

        await order.save();
        

        res.status(200).json({
            success: true,
            message: 'Заказ оплачен',
            data: order,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка, статус 500'
        })
    }
}

const getAllOrdersByUser = async(req, res) => {
    try {

        const {userId} = req.params;

        const orders = await Order.find({userId});

        if(!orders.length) {
            return res.status(404).json({
                success: false,
                message: 'Заказы не найдены'
            })
        }

        res.status(200).json({
            success: true,
            data: orders,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка, статус 500'
        })
    }
}

const getOrderDetails = async(req, res) => {
    try {
        
        const {id} = req.params;

        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: 'Данный заказ не найден'
            })
        }

        res.status(200).json({
            success: true,
            data: order,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка, статус 500'
        })
    }
}

module.exports = {createOrder, capturePayment, getAllOrdersByUser, getOrderDetails};