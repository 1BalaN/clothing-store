import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId}) {
    
    return ( 
        <Card 
            onClick={setCurrentSelectedAddress ? ()=>setCurrentSelectedAddress(addressInfo) : null} 
            className={`text-start cursor-pointer border-red-700 ${
                selectedId?._id === addressInfo?._id 
                ? 'border-red-900 border-[4px]'
                : 'border-black'
            }`}
        >
            <CardContent className='grid p-4 gap-4' >
                <Label>Город: {addressInfo?.city}</Label>
                <Label>Адрес: {addressInfo?.address}</Label>
                <Label>Домофон: {addressInfo?.pincode}</Label>
                <Label>Телефон: {addressInfo?.phone}</Label>
                <Label>Пометки: {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className='p-3 flex justify-between'>
                <Button onClick={()=> handleEditAddress(addressInfo)}>Изменить</Button>
                <Button onClick={()=> handleDeleteAddress(addressInfo)} >Удалить</Button>
            </CardFooter>
       </Card>
     );
}

export default AddressCard;