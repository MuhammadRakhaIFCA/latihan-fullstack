import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import defaultPic from "@/assets/day-tree.jpg"
import { useState } from "react"
import { IoIosAdd, IoIosRemove } from "react-icons/io"

export const ProductCard = () => {
    const [quantity, setQuantity] = useState(0)
    const [stock, setStock] = useState(10);
    const addQuantity = () => {
        quantity < stock ? setQuantity(quantity + 1) : alert('not enough stock')
    }
    const removeQuantity = () => {
        quantity > 0 ? setQuantity(quantity - 1) : alert("quantity can't be zero")
    }
    return (
        <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4 bg-gray-200">
            <Link to={"/product/"} className="aspect-square w-full overflow-hidden">
                <img
                    className="w-full h-full"
                    src={defaultPic} alt="product" />
            </Link>
            <Link to={"/product/"}>
                <p className="text-md">product name</p>
                <p className="text-xl font-semibold">
                    Rp 10.000
                </p>
                <p className="text-sm text-muted-foreground">In stock : 5</p>
            </Link>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Button disabled={!quantity} onClick={removeQuantity} size="icon" variant="ghost"><IoIosRemove className="h-6 w-6" /></Button>
                    <p className="text-lg font-bold">{quantity}</p>
                    <Button disabled={quantity >= stock} onClick={addQuantity} size="icon" variant="ghost"><IoIosAdd className="h-6 w-6 " /></Button>
                </div>

                <Button className="w-full " disabled={stock <= 0 || quantity <= 0}>
                    {
                        stock > 0 ? "Add to cart" : "Out of stock"
                    }
                </Button>
            </div>
        </div>
    )
}