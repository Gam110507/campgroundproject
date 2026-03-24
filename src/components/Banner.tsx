'use client'
import { useState } from 'react' ;
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import style from './banner.module.css'
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/cover3.jpg','/img/cover.jpg', '/img/cover2.jpg', '/img/cover4.jpg'] ;
    const [index, setIndex ] = useState(0) ;
    const router = useRouter() ;

    const {data:session} = useSession() ;
    // console.log(session?.user) ;

    return (
        <div className={style.banner} onClick={()=>{ setIndex(index+1) }}>
            <Image src={covers[index%4]} 
            alt='cover' 
            fill={true} 
            priority
            className='object-cover'/>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className={style.bannerText}>
            <h1 className='text-6xl font-bold text-white tracking-tight drop-shadow-lg mb-2'>
            Escape to the <span className="text-orange-400">Wild</span>
            </h1>
            <h3 className='text-lg font-medium text-white italic'>
            Discover your perfect campsite and sleep under the stars.
            </h3>
            </div>
            {
                session? <div className='z-20 absolute right-10 top-5 font-semibold text-orange-400 text-xl'>Hello {session.user?.name}</div> : null 
            }
            <button className='bg-white text-orange-400 border border-orange-400 font-semibold py-2 px-2 m-2 rounded-lg z-20 absolute bottom-0 right-0 hover:bg-orange-400 hover:text-white hover:border-transparent' onClick={(e)=>{e.stopPropagation(); router.push('campground') ;}}>
                Select Your Campground NOW
            </button>
        </div>
    ) ;
}