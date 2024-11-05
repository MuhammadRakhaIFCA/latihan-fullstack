import { Link, useParams } from "react-router-dom"
import { Button } from "./ui/button"
import defaultPic from "@/assets/day-tree.jpg"
import { useContext, useState } from "react"
import { IoIosAdd, IoIosRemove } from "react-icons/io"
import { AuthContext } from "@/context/AuthContext"
import { ProductForm } from "./ProductForm"
import { useMutation } from "@tanstack/react-query"
import { axiosExpress } from "@/lib/axios"

export const ProductCard = (props) => {
    const { currentUser } = useContext(AuthContext)
    const params = useParams()
    const [quantity, setQuantity] = useState(0)
    const [stock, setStock] = useState(props.stock);
    const addQuantity = () => {
        quantity < stock ? setQuantity(quantity + 1) : alert('not enough stock')
    }
    const removeQuantity = () => {
        quantity > 0 ? setQuantity(quantity - 1) : alert("quantity can't be zero")
    }
    const { mutate: editProduct, isLoading: editingProduct } = useMutation({
        mutationFn: async (values) => {
            await axiosExpress.post(`/products/edit/${props.id}`, values, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(values)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products", currentUser.id]);
            alert("product edited")
        },
    });
    return (
        <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4 bg-gray-200">
            <div>
                {
                    props.ownerId == currentUser.id ?
                        <>
                            <ProductForm defaultId={params.userId} onSubmit={editProduct}
                                defaultName={props.name}
                                defaultStock={props.stock}
                                defaultPrice={props.price}
                                defaultDescription={props.description}
                                trigger={
                                    <div className="cursor-pointer">
                                        {
                                            props.image
                                                ?
                                                <img src={`/uploads/${props.image}`}
                                                    className="w-full h-full" alt="" />
                                                :
                                                <img
                                                    className="w-full h-full"
                                                    src={defaultPic} alt="product" />
                                        }


                                        <p className="text-md">{props.name}</p>
                                        <p className="text-xl font-semibold">
                                            Rp {props.price}
                                        </p>
                                        <p className="text-sm text-muted-foreground">In stock : {stock}</p>
                                    </div>}>

                            </ProductForm>



                        </>
                        : <>
                            <Link to={"/product/" + props.id} className="aspect-square w-full overflow-hidden">
                                {
                                    props.image
                                        ?
                                        <img src={`/uploads/${props.image}`}
                                            className="w-full h-full" alt="" />
                                        :
                                        <img
                                            className="w-full h-full"
                                            src={defaultPic} alt="product" />
                                }
                            </Link>
                            <Link to={"/product/" + props.id}>
                                <p className="text-md">{props.name}</p>
                                <p className="text-xl font-semibold">
                                    Rp {props.price}
                                </p>
                                <p className="text-sm text-muted-foreground">In stock : {stock}</p>
                            </Link>
                        </>
                }
            </div>


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