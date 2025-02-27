const  Product = require('../../models/Product')

const getFilteredProducts = async(req, res)=> {
    try {

        const {category = [], brand = [], sortBy = 'price-lowtohigh'} = req.query

        let filters = {};
        if(category.length) {
            filters.category = {$in: category.split(',')}
        }
        if(brand.length) {
            filters.brand = {$in: brand.split(',')}
        }

        let sort = {}

        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1
                break;

            case 'price-hightolow':
                sort.price = -1
                break;

            case 'price-atoz':
                sort.title = 1
                break;

            case 'price-ztoa':
                sort.title = -1
                break;
        
            default:
                sort.price = 1
                break;
        }

        const products = await Product.find(filters).sort(sort);

        res.status(200).json({
            success: true,
            data: products
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Ошибка вывода сортированных товаров'
        })
        
    }
};

const getProductDetails = async(req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({
            success: false,
            message: 'Товар не найден'
        })

        res.status(200).json({
            success: true,
            data: product
        })
        
    } catch (error) {
        console.log(error);
        res.status().json({
            success: false,
            message: 'Ошибка вывода информации о товаре'
        })
        
    }
}

module.exports = {getFilteredProducts, getProductDetails}