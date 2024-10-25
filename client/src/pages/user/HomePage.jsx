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



const HomePage = () => {


    return (
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
                {Array.from({ length: 5 }).map((_, index) => (
                    <Post
                        index={index}
                    />


                ))}
            </div>
        </div>
    )
}

export default HomePage