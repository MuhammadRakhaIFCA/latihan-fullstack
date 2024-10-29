
import { Post } from "@/components/Post"
import SignedInPage from "@/guard/SignedInPage"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { axiosExpress } from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"



const ExploreHomePage = () => {
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            axiosExpress.get(`/posts/explore/${currentUser.id}`).then((res => res.data))
    })

    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <SignedInPage>
            <div className="w-full overflow-x-hidden">

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
                                />
                            )
                        })
                    }
                </div>
            </div>
        </SignedInPage>
    )
}

export default ExploreHomePage