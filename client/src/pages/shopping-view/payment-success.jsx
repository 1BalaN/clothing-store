import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";

function PaymentSuccessPage() {

    const navigate = useNavigate();

    return ( 
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="p-10 shadow-xl border border-green-300 bg-green-50 text-center">
                <CardHeader className="p-0 flex flex-col items-center">
                    <BsCheckCircle className="text-green-500 text-6xl mb-4" />
                    <CardTitle className="text-3xl md:text-4xl font-bold text-green-700">
                        Оплата прошла успешно!
                    </CardTitle>
                </CardHeader>
                <Button 
                    className="mt-6 bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-lg transition"
                    onClick={() => navigate('/shop/account')}
                >
                    Посмотреть заказы
                </Button>
            </Card>
        </motion.div>
     );
}

export default PaymentSuccessPage;