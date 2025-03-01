import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import React from 'react';

function Footer() {
    return ( 
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">E-clothes</h3>
                        <p className="text-gray-400">
                            Онлайн-платформа современных модных тенденций. Мы предлагаем лучшую одежду по доступным ценам.
                        </p>
                        <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <FaFacebook size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <FaInstagram size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <FaTwitter size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <FaYoutube size={24} />
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Магазин</h4>
                    <ul className="space-y-2">
                        <li>
                            <p className="text-gray-400 hover:text-white transition duration-300">
                                Женская одежда
                            </p>
                        </li>
                        <li>
                            <p className="text-gray-400 hover:text-white transition duration-300">
                                Мужская одежда
                            </p>
                        </li>
                        <li>
                            <p className="text-gray-400 hover:text-white transition duration-300">
                                Детская одежда
                            </p>
                        </li>
                        <li>
                            <p className="text-gray-400 hover:text-white transition duration-300">
                                Аксессуары
                            </p>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Контакты</h4>
                    <ul className="space-y-2">
                        <li className="text-gray-400">Email: info@e-clothes.com</li>
                        <li className="text-gray-400">Телефон: +375448756448</li>
                        <li className="text-gray-400">Адрес: Минск, ул. Программистов 10</li>
                    </ul>
                </div>
            </div>
  
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} E-clothes. Все права защищены.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <p className="text-gray-400 hover:text-white text-sm transition duration-300">
                        Политика конфиденциальности
                    </p>
                    <p className="text-gray-400 hover:text-white text-sm transition duration-300">
                        Условия использования
                    </p>
                </div>
            </div>
        </div>
        </footer>
    );
}

export default Footer;