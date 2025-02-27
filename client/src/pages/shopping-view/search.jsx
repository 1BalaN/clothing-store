import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { TbMoodSad } from "react-icons/tb";


function SearchProducts() {

    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


    const dispatch = useDispatch();
    const {searchResults} = useSelector(state=> state.shopSearch);
    const {productDetails} = useSelector(state=>state.shoppingProducts);
    const {user} = useSelector(state=> state.auth);
    const {cartItems} = useSelector(state=>state.shopCart);

    const {toast} = useToast();

    useEffect(()=> {
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            setTimeout(()=> {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword));
            }, 1000)
        } 
        else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    },[keyword])

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

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }
    
    useEffect(()=> {
        if(productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])
    
    return ( 
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input 
                        value={keyword}
                        name="keyword"
                        onChange={(event)=>setKeyword(event.target.value)}
                        className="py-6"
                        placeholder='Найти товар' 
                    />
                </div>
            </div>
            {
                !searchResults.length ? (
                    <motion.div
                    className="flex flex-col items-center justify-center mt-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                    <TbMoodSad className="text-6xl text-gray-500" />
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-700 mt-4">
                        Товары не найдены!
                    </h1>
                    <p className="text-lg text-gray-500 mt-2">
                        Попробуйте изменить запрос.
                    </p>
                    </motion.div>
                ) : null
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    searchResults.map((item) => (
                        <ShoppingProductTile 
                            product={item}
                            handleAddtoCart={handleAddtoCart}
                            handleGetProductDetails={handleGetProductDetails}
                        />
                    ))
                }
            </div>
            <ProductDetailsDialog 
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
     );
}

export default SearchProducts;