import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrdersDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetailsForAdmin } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    const {orderList, orderDetails} = useSelector((state) => state.adminOrder);
    const dispatch = useDispatch();

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId));
    }

    useEffect(()=> {
        dispatch(getAllOrdersForAdmin());
    }, [dispatch])

    useEffect(()=> {
        if(orderDetails !== null) {
            setOpenDetailsDialog(true);
        }
    },[orderDetails])
    

    return ( 
        <Card>
            <CardHeader>
                <CardTitle>История заказов</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader >
                        <TableRow>
                            <TableHead>№ заказа</TableHead>
                            <TableHead>Дата заказа</TableHead>
                            <TableHead>Статус заказа</TableHead>
                            <TableHead>Стоимость заказа</TableHead>
                            <TableHead>
                                <span className="sr-only">Детали</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-start">
                        {
                            orderList && orderList.length > 0
                              ? orderList.map((orderItem)=> (
                                <TableRow>
                                    <TableCell>{orderItem?._id}</TableCell>
                                    <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`py-1 px-3 ${
                                                orderItem?.orderStatus === 'Доставлен' 
                                                    ? 'bg-green-500'
                                                    : orderItem?.orderStatus === 'Возврат'
                                                    ? 'bg-red-600'
                                                : 'bg-black'
                                            }`}
                                        >
                                            {orderItem?.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${orderItem?.totalAmount}</TableCell>
                                    <TableCell>
                                        <Dialog 
                                            open={openDetailsDialog} 
                                            onOpenChange={()=> {
                                                setOpenDetailsDialog(false)
                                                dispatch(resetOrderDetailsForAdmin());
                                            }}
                                        >
                                            <Button onClick={()=>handleFetchOrderDetails(orderItem?._id)}>Посмотреть Детали</Button>
                                            <AdminOrdersDetailsView orderDetails={orderDetails} />
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                              )) : null
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
     );
}

export default AdminOrdersView;