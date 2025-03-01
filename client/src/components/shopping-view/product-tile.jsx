import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { ShoppingCart } from "lucide-react";


function ShoppingProductTile({product, handleGetProductDetails, handleAddtoCart}) {


    return (
        <Card className="w-full max-w-sm mx-auto" >
            <div onClick={()=> handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img 
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    {
                        product?.totalStock === 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600" >
                                Нет в наличии
                            </Badge>
                        ) : product?.totalStock < 10 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                {`Осталось ${product?.totalStock} штук`}
                            </Badge>
                        ) : product?.salePrice > 0 ? ( 
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                Sale %
                            </Badge>
                        ) : null
                    }   
                </div>
            </div>
            <CardContent className="p-4" >
                <h2 className="text-xl font-bold  mb-2 text-left">{product?.title}</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[16px] text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
                    <span className="text-[16px] text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>
                        ${product?.price}
                    </span>
                    {
                        product?.salePrice > 0 ? (
                            <span className="text-lg font-semibold text-primary">
                                ${product?.salePrice}
                            </span>
                        ) : null
                    }
                </div>
            </CardContent>
            <CardFooter>
                {
                    product?.totalStock === 0 ? (
                        <Button className="w-full opacity-60 cursor-not-allowed">
                            Нет в наличии
                        </Button>
                    ) : (
                        <Button onClick={()=>handleAddtoCart(product?._id, product?.totalStock)} className="w-full">
                            В корзину <ShoppingCart /> 
                        </Button>
                    )
                }
            </CardFooter>
        </Card>
     );
}

export default ShoppingProductTile;