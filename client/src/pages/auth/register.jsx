import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    userName: '',
    email: '',
    password: '',
}

function AuthRegister() {

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            console.log(data);
            if(data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
                navigate('/auth/login')
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: 'destructive',
                })
            }
        })

    }

    console.log(formData);
    

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Создайте новый аккаунт</h1>
                <p className="mt-2">
                    Уже есть аккаунт ?
                    <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/login'>Вход</Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Зарегистрироваться'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;