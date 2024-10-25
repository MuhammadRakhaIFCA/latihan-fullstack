import Image1 from '@/assets/1.png';
import Image2 from '@/assets/2.png';
import Image3 from '@/assets/3.png';
import Image4 from '@/assets/4.png';
import Image5 from '@/assets/5.png';
import Image6 from '@/assets/6.png';
import Image7 from '@/assets/7.png';
import Image8 from '@/assets/8.png';
import Image9 from '@/assets/9.png';
import Image10 from '@/assets/10.png';
import Image11 from '@/assets/11.png';
import Image12 from '@/assets/11.png';
import Image13 from '@/assets/11.png';
import { ScrollArea } from './ui/scroll-area';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const Leftbar = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <ScrollArea className="flex flex-col w-[20%] h-screen">
            <div className="flex flex-row gap-3 items-center ml-4 my-2">
                <img src={Image1} alt="" className='w-7 h-7' />
                <span >{currentUser.username}</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image2} alt="" className='w-7 h-7' />
                <span>Friends</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image3} alt="" className='w-7 h-7' />
                <span>Groups</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image4} alt="" className='w-7 h-7' />
                <span>Marketplace</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image5} alt="" className='w-7 h-7' />
                <span>Watch</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image6} alt="" className='w-7 h-7' />
                <span>Memories</span>
            </div>


            <div className="flex flex-row gap-3 items-center mx-4 mt-6 mb-2">
                <p>your shortcut</p>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image7} alt="" className='w-7 h-7' />
                <span>Events</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image8} alt="" className='w-7 h-7' />
                <span>Gaming</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image9} alt="" className='w-7 h-7' />
                <span>Gallery</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image10} alt="" className='w-7 h-7' />
                <span>Video</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image11} alt="" className='w-7 h-7' />
                <span>Messages</span>
            </div>


            <div className="flex flex-row gap-3 items-center mx-4 mt-6 mb-2">
                <p>Others</p>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image12} alt="" className='w-7 h-7' />
                <span>Fundraiser</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image12} alt="" className='w-7 h-7' />
                <span>Tutorials</span>
            </div>
            <div className="flex flex-row gap-3 items-center mx-4 my-2">
                <img src={Image13} alt="" className='w-7 h-7' />
                <span>Courses</span>
            </div>

        </ScrollArea>
    )
}