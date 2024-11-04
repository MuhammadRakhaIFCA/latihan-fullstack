import { AuthContext } from "@/context/AuthContext";
import { axiosExpress } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import defaultPic from "@/assets/day-tree.jpg"
import { Button } from "@/components/ui/button";

const ProductDetailPage = () => {
    const params = useParams()
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient();

    const { data: product, isLoading: loadingProduct } = useQuery({
        queryKey: ["product"],
        queryFn: () => axiosExpress.get(`/products/get/detail/${params.productId}`).then((res) => res.data)
    })
    if (loadingProduct) return <p>loading product...</p>
    return (
        <div className="gap-2 flex flex-col justify-normal">
            {
                loadingProduct ? <p>loading product...</p> : null
            }
            <img src={defaultPic} alt="" />
            <h1 className="text-3xl font-bold text-start">Rp. {(product.price).toLocaleString("id-ID")}</h1>
            <h2 className="text-xl text-start">{product.name}</h2>
            <Link to={`/profile/${product.userid}`}>
                <div className="flex gap-2 items-center bg-gray-200 rounded-md">
                    <img src={`/uploads/${product.profile_picture}`} alt="" className="rounded-full" />
                    <p>{product.username}</p>
                </div>
            </Link>
            <p className="text-start">{product.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum impedit odio numquam excepturi culpa deleniti voluptates atque libero. Repellat, saepe? Ipsa odio veritatis ipsum reprehenderit, corrupti ad consectetur dignissimos laudantium!</p>
            <Button className="w-[12%] justify-self-end">Add to cart</Button>
        </div>
    )
}

export default ProductDetailPage