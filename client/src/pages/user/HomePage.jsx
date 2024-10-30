import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


import img from "@/assets/img.png"

import { Post } from "@/components/Post"
import SignedInPage from "@/guard/SignedInPage"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { axiosExpress } from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"



const HomePage = () => {
    const { currentUser } = useContext(AuthContext)
    const [user, setUser] = useState()
    const queryClient = useQueryClient()

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            axiosExpress.get(`/posts/get/${currentUser.id}`).then((res => res.data))
    })



    useEffect(() => {
        const getUserById = async (id) => {
            try {
                const data = await axiosExpress.get(`/users/get/${params.userId}`)
                console.log(data.data)
                setUser(data.data)
            } catch (error) {

            }
        }

        getUserById()

    }, [])

    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <SignedInPage>
            <div className="w-full overflow-x-hidden">
                <div className="ml-10 w-full">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-[90%] "
                    >
                        <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex flex-col aspect-square items-center justify-center p-6 bg-cover bg-center bg-gray-300"
                                                style={{
                                                    backgroundImage: `url(${img})`,
                                                }}
                                            >

                                                <span className="text-md font-semibold text-black rounded-md relative mr-[100px] mt-[150px] w-full">
                                                    Story: {index + 1}
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>

                </div>
                <div className="my-10 grid justify-items-stretch">
                    {
                        data.map((post) => {
                            return (
                                <Post
                                    key={post.id}
                                    id={post.post_id}
                                    userId={post.user_id}
                                    description={post.description}
                                    profile_picture={currentUser.profile_picture}
                                    username={post.username}
                                    created_at={post.created_at}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </SignedInPage>
    )
}

export default HomePage