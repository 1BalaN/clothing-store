import { Button } from '@/components/ui/button';
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, Footprints, ShirtIcon, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { SiAdidas, SiLubuntu, SiNike, SiPuma, SiTeepublic, SiWondershare, SiZara } from '@icons-pack/react-simple-icons';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import { getFeatureImages } from '@/store/common-slice';

const categoriesWithIcon =  [
    { id: "men", label: "Мужское", icon: ShirtIcon },
    { id: "women", label: "Женское", icon: SiLubuntu},
    { id: "kids", label: "Детское", icon: BabyIcon },
    { id: "accessories", label: "Аксессуары", icon: WatchIcon },
    { id: "footwear", label: "Обувь", icon: Footprints },
];

const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: SiNike },
    { id: "adidas", label: "Adidas", icon: SiAdidas },
    { id: "puma", label: "Puma", icon: SiPuma },
    { id: "bershka", label: "Bershka", icon: SiWondershare },
    { id: "zara", label: "Zara", icon: SiZara },
    { id: "pull&bear", label: "Pull&Bear", icon: SiTeepublic },
];

function ShoppingHome() {

    const[currentSlide, setCurrentSlide] = useState(0);
    const {productList, productDetails} = useSelector(state=>state.shoppingProducts)
    const {user} = useSelector(state=>state.auth)
    const {cartItems} = useSelector(state=> state.shopCart)
    const {featureImageList} = useSelector(state => state.commonFeature)


    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id],
        };

        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate(`/shop/listing`);
    }

    function handleGetProductDetails(getCurrentProductId) {
            dispatch(fetchProductDetails(getCurrentProductId))
            
    }

    function handleAddtoCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];

        if(getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex((item)=> item.productId === getCurrentProductId);
            if(indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if(getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Данного товара можно добавить только ${getQuantity} штук`,
                        variant: 'destructive'
                    });
                    return;
                }
            }
        }
        dispatch(addToCart({userId: user?.id, productId: getCurrentProductId, quantity: 1}))
        .then((data)=> {
            if(data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast({
                    title: 'Товар добавлен в корзину'
                })
            }
        })
            
    }

    useEffect(()=> {
        const timer = setInterval(()=>{
            setCurrentSlide(prevSlide=>(prevSlide + 1) % featureImageList.length)
        }, 5000)
        return ()=>clearInterval(timer)
    },[featureImageList])

    useEffect(()=>{
        dispatch(fetchAllFilteredProducts({filterParams: {}, sortParams: 'price-lowtohigh'}))
    },[dispatch])

    useEffect(() => {
        if(productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])

     useEffect(() => {
            dispatch(getFeatureImages())
        }, [dispatch])

    return ( 
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
                {
                    featureImageList.map && featureImageList.length > 0
                        ?   featureImageList.map((slide,index) => (
                                <img 
                                    src={slide?.image}
                                    key={index}
                                    className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                                />
                            ))
                        : null
                }
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={()=>setCurrentSlide(prevSlide=>(prevSlide - 1 + featureImageList.length) % featureImageList.length)}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80" 
                > 
                    <ChevronLeftIcon className='w-4 h-4'/>
                </Button>
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={()=>setCurrentSlide(prevSlide=>(prevSlide + 1) % featureImageList.length)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80" 
                > 
                    <ChevronRightIcon className='w-4 h-4'/>
                </Button>
            </div>
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>
                        Перейти к категориям
                    </h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {
                            categoriesWithIcon.map((categoryItem)=> (
                                <Card 
                                    onClick={()=>handleNavigateToListingPage(categoryItem, 'category')}
                                    className="cursor-pointer hover:shadow-lg transition-shadow" 
                                >
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                                        <span className='font-bold'>{categoryItem.label}</span>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>
                        Перейти к брендам
                    </h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                        {
                            brandsWithIcon.map((brandItem)=> (
                                <Card 
                                    onClick={()=>handleNavigateToListingPage(brandItem, 'brand')}
                                    className="cursor-pointer hover:shadow-lg transition-shadow" 
                                >
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <brandItem.icon className='w-12 h-12 mb-4 text-primary' />
                                        <span className='font-bold'>{brandItem.label}</span>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>
                        Хит товары
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {
                            productList && productList.length > 0 ?
                                productList.map((productItem)=>(
                                    <ShoppingProductTile 
                                        handleGetProductDetails={handleGetProductDetails}
                                        handleAddtoCart={handleAddtoCart}       
                                        product={productItem} 
                                    />
                                ))
                            : null
                        }
                    </div>
                </div>
            </section>
            <ProductDetailsDialog 
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
     );
}

export default ShoppingHome;


