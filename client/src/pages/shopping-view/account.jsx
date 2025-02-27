import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import accImg from '../../assets/account.jpg'
import Address from '@/components/shopping-view/address';
import ShoppingOrders from '@/components/shopping-view/orders';

function ShoppingAccount() {
    return ( 
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img
                    src={accImg} 
                    alt="account_photo"
                    className='h-full w-full object-cover object-center' 
                />
            </div>
            <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
                <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
                    <Tabs defaultValue='orders' >
                        <TabsList>
                            <TabsTrigger value="orders">Заказы</TabsTrigger>
                            <TabsTrigger value="address">Адреса</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">
                            <ShoppingOrders />
                        </TabsContent>
                        <TabsContent value="address">
                            <Address />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
     );
}

export default ShoppingAccount;