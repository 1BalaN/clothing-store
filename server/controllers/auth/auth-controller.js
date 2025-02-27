const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')


//регистрация
const registerUser = async(req, res) => {
    const  {userName, email, password} = req.body;

    try {

        const checkUser = await User.findOne({email});
        if(checkUser) {
            return res.json({
                success: false,
                message: 'Пользователь с таким email уже существует',
            })
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, 
            email,
            password: hashPassword, 
        })

        await newUser.save()
        res.status(200).json({
            success: true,
            message: 'Регистрация прошла успешно'
        })

    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка'
        })
    }
}


//вход в аккаунт
const loginUser = async(req, res) => {
    const  {email, password} = req.body

    try {

        const checkUser = await User.findOne({email});
        if(!checkUser) {
            return res.json({
                success: false,
                message: 'Данного пользователя не существует. Пожалуйста зарегистрируйтесь !',
            })
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
        if(!checkPasswordMatch) 
            return res.json({
                success: false,
                message: 'Неверный пароль ! Попробуйте еще раз'
            });

            const token = jwt.sign({
                id: checkUser._id, 
                role : checkUser.role, 
                email : checkUser .email,
                userName: checkUser.userName,
            }, 'CLIENT_SECRET_KEY', {expiresIn: '60m'})


            res.cookie('token', token, {httpOnly: true, secure: false}).json({
                success: true,
                message: 'Вы вошли в аккаунт',
                user: {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id,
                    userName: checkUser.userName,
                }
            })
        

    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка'
        })
    }
}


//выход из аккаунта
const logoutUser = (req, res)=> {
    res.clearCookie('token').json({
        success: true,
        message: 'Вы вышли из аккаунта'
    })
}


//authMiddleware
const authMiddleware = async(req, res, next)=> {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success: false,
        message: 'Неавторизованный пользователь !'
    })

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Неавторизованный пользователь !'
        })
        
    }
}



module.exports = { registerUser, loginUser, logoutUser, authMiddleware };