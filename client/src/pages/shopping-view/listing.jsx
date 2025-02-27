import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for(const [key,value] of Object.entries(filterParams)) {
        if(Array.isArray(value) && value.length > 0) {
            const paramValue=value.join(',')

            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }

    return queryParams.join('&')
}

function ShoppingListing() {

    const dispatch = useDispatch()
    const {productList, productDetails} = useSelector(state => state.shoppingProducts)

    const {user} = useSelector(state=>state.auth)
    const {cartItems} = useSelector(state=> state.shopCart)

    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null)

    const [searchParams, setSearchParams] = useSearchParams()

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    const {toast} = useToast()

    const categorySearchParam = searchParams.get('category');

    function handleSort(value) {
        setSort(value)
    }

    function handleFilter(getSectionId, getCurrentOption) {

        let copyFilters = {...filters};
        const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);

        if(indexOfCurrentSection === -1){
            copyFilters = {
                ...copyFilters,
                [getSectionId] : [getCurrentOption]
            }
        } else {
            const indexOfCurrentSection = copyFilters[getSectionId].indexOf(getCurrentOption)
            if(indexOfCurrentSection === -1) copyFilters[getSectionId].push(getCurrentOption)
                else copyFilters[getSectionId].splice(indexOfCurrentSection, 1)
        }
        setFilters(copyFilters)
        sessionStorage.setItem('filters', JSON.stringify(copyFilters));
        
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
        setSort('price-lowtohigh');
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, [categorySearchParam])

    useEffect(()=> {
        if(filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters)
            setSearchParams(new URLSearchParams(createQueryString))
        }
    },[filters])

    useEffect(()=> {
        if(filters !== null && sort !==null)
        dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}))
    },[dispatch, sort, filters])

    useEffect(() => {
        if(productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])
    
    

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilter={handleFilter}/>
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">Все Товары</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{productList.length} Товаров</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="h-4 w-4" />
                                    <span>Сортировка</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]" >
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {
                                        sortOptions.map((sortItem) => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>)
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {
                        productList && productList.length > 0 ?
                        productList.map(productItem => (
                            <ShoppingProductTile 
                                handleGetProductDetails={handleGetProductDetails} 
                                product={productItem}
                                handleAddtoCart={handleAddtoCart}
                            />)
                        ) : null
                    }
                </div>
            </div>
            <ProductDetailsDialog 
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
     );
}

export default ShoppingListing;