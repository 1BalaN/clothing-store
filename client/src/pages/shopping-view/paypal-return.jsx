import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureOrder } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function PaypalReturnPage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID');

    useEffect(()=>{
        if(paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
            
            dispatch(captureOrder({paymentId, payerId, orderId})).then((data)=> {
                if(data?.payload?.success) {
                    sessionStorage.removeItem('currentOrderId');
                    window.location.href = '/shop/payment-success';
                }
            })
        }
    },[paymentId,payerId, dispatch])

    return ( 
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center min-h-screen"
        >
            <Card className="p-8 bg-blue-50 shadow-xl rounded-lg border border-blue-200 w-full max-w-md text-center">
                <CardHeader className="p-4 flex flex-col items-center">
                    <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-6xl mb-4" />
                    <CardTitle className="text-xl md:text-2xl font-semibold text-blue-700">
                        Пожалуйста подождите, идет процесс оплаты...
                    </CardTitle>
                </CardHeader>
            </Card>
        </motion.div>
    );
}

export default PaypalReturnPage;