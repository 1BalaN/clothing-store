import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";

const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: '',
};

function Address({setCurrentSelectedAddress, selectedId}) {

    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state)=>state.shopAddress);
    const { toast } = useToast();

    function handleManageAddress(event) {
        event.preventDefault();

        if(addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressFormData);
            toast({
                title: 'Вы можете добавить максимум 3 адреса',
                variant: 'destructive',
            });

            return
        }
        

        currentEditedId !== null 
            ? dispatch(editaAddress({
                userId: user?.id,
                addressId: currentEditedId,
                formData,
                
            })).then((data)=> {
                if(data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id))
                    setCurrentEditedId(null)
                    setFormData(initialAddressFormData)
                    toast({
                        title:'Адрес изменен'
                    })
                }
            }) :
            dispatch(addNewAddress({
                ...formData,
                userId: user?.id
            })).then((data=> {
                if(data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id));
                    setFormData(initialAddressFormData);
                    toast({
                        title: 'Адрес успешно добавлен'
                    })
                }
            }))
        

    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(deleteAddress({userId: user?.id, addressId: getCurrentAddress?._id}))
        .then((data)=> {
            if(data?.payload.success) {
                dispatch(fetchAllAddresses(user?.id));
                toast({
                    title: 'Адрес удален'
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes,
        })
        
    }

    function isFormValid() {
        return Object.keys(formData).map((key)=> formData[key].trim() !== '')
        .every((item)=> item)
    }

    useEffect(()=>{
        dispatch(fetchAllAddresses(user?.id))
    },[dispatch])


    return ( 
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {addressList && addressList.length > 0
                    ? addressList.map((singleAddressItem) => (
                        <AddressCard 
                            addressInfo={singleAddressItem}
                            handleDeleteAddress={handleDeleteAddress}
                            handleEditAddress={handleEditAddress}
                            setCurrentSelectedAddress={setCurrentSelectedAddress}
                            selectedId = {selectedId}
                        />
                    )) 
                    : null
                }
            </div>
            <CardHeader>
                <CardTitle>
                    {
                        currentEditedId !== null ? 'Изменить адрес' : 'Добавить новый адрес'
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3' >
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? 'Изменить' : 'Добавить'}   
                    onSubmit={handleManageAddress}  
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
     );
}

export default Address;