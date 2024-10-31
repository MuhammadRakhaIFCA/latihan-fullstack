import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosExpress } from "@/lib/axios";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";


export const SheetComponent = (props) => {
    const queryClient = useQueryClient();
    const { data: followings = [], isLoading: loadingFollowing } = useQuery({
        queryKey: ["followings", props.userId],
        queryFn: () => axiosExpress.get(`users/followed/${props.userId}`).then((res) => res.data),
        enabled: !!props.userId
    });
    const { data: followers = [], isLoading: loadingFollower } = useQuery({
        queryKey: ["followergs", props.userId],
        queryFn: () => axiosExpress.get(`users/follower/${props.userId}`).then((res) => res.data),
        enabled: !!props.userId
    });

    if (loadingFollowing) return <p>loading following...</p>
    if (loadingFollower) return <p>loading follower...</p>
    return (
        <Sheet>
            <SheetTrigger asChild>
                <p>{props.children} : {props.count}</p>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{props.children}</SheetTitle>
                    <SheetDescription>

                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">

                    {
                        props.children == "Following" ? followings.map((following) => {
                            return (
                                <div className="flex flex-row items-center m-3 justify-between">
                                    <Link to={`/profile/${following.id}`}>
                                        <div className="flex gap-2">
                                            <img className="rounded-full w-7 h-7 border-2 border-gray-200" src={`/uploads/${following.profile_picture}`} alt="" />
                                            <span>{following.username}</span>
                                        </div>
                                    </Link>
                                    <Link to={`/chat/${following.id}`}>
                                        <Button variant="outline">
                                            chat
                                        </Button>
                                    </Link>
                                </div>
                            )
                        })
                            :
                            followers.map((follower) => {
                                return (
                                    <div className="flex flex-row items-center m-3 justify-between">
                                        <Link to={`/profile/${follower.id}`}>
                                            <div className="flex gap-2">
                                                <img className="rounded-full w-7 h-7 border-2 border-gray-200" src={`/uploads/${follower.profile_picture}`} alt="" />
                                                <span>{follower.username}</span>
                                            </div>
                                        </Link>
                                        <Link to={`/chat/${follower.id}`}>
                                            <Button variant="outline">
                                                chat
                                            </Button>
                                        </Link>
                                    </div>
                                )
                            })
                    }
                </div>
            </SheetContent>
        </Sheet>
    )

}