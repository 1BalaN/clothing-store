import { useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

function ShoppingOrderDetailsView({orderDetails}) {

    const { user } = useSelector((state)=> state.auth);

    return ( 
        <DialogContent className="sm:max-w-[600px]">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">№ заказа</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Дата заказа</p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Стоимость заказа</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Способ оплаты</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Статус оплаты</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Статус заказа</p>
                        <Label>
                            <Badge
                                className={`py-1 px-3 ${
                                    orderDetails?.orderStatus === 'Доставлен' 
                                        ? 'bg-green-500'
                                        : orderDetails?.orderStatus === 'Возврат'
                                        ? 'bg-red-600'
                                    : 'bg-black'
                                }`}
                            >
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Содержимое заказа</div>
                            <ul className="grid gap-4 max-w-lg bg-white p-4 rounded-xl shadow-md text-start">
                                {
                                    orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                        ? orderDetails?.cartItems.map((item, index) => (
                                            <li
                                                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <span className="font-semibold">{item.title}</span>
                                                <span>Количество: {item.quantity}</span>
                                                <span>Цена: ${item.price}</span>
                                            </li>
                                        ))
                                    : <p className="text-gray-500">Нет товаров в корзине</p>
                                }
                            </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Информация о доставке</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>Домофон: {orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
     );
}

export default ShoppingOrderDetailsView;