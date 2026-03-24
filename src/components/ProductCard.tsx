import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function ProductCard({ campgroundName, imgSrc} : { campgroundName:string, imgSrc:string }) {
    return (
        <InteractiveCard contentName={campgroundName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg' 
                />
            </div>
            <div className='w-full h-[15%] p-[10px]'>{campgroundName}</div>
        </InteractiveCard>
    ) ;
}