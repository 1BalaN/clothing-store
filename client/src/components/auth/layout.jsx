import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden lg:flex items-center justify-center relative w-1/2 bg-black overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 opacity-30"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <motion.div
                    className="absolute w-72 h-72 bg-purple-500 rounded-full opacity-40 filter blur-3xl"
                    animate={{ x: [-100, 100, -100], y: [50, -50, 50] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-52 h-52 bg-blue-500 rounded-full opacity-40 filter blur-3xl"
                    animate={{ x: [50, -50, 50], y: [-50, 50, -50] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-md space-y-6 text-center text-white relative z-10"
                >
                    <h1 className="text-5xl font-extrabold tracking-tight">
                        Добро пожаловать!
                    </h1>
                    <p className="text-lg mt-4">
                        Создайте аккаунт или войдите, чтобы получить доступ к лучшим предложениям.
                    </p>
                </motion.div>
            </div>

            <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
