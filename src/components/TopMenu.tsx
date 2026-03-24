import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import style from './topMenu.module.css' ;
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOption';
import Link from 'next/link';

export default async function TopMenu() {

    const session = await getServerSession(authOptions) ;

    return (
        <div className={style.menucontainer}>
            <Link href={"/"}>
            <div className='flex text-white font-bold bg-orange-400 py-2 px-4 h-full text-center items-center'>AAA</div>
            {/* <Image src={'/img/logo.png'} className={style.logoimg} alt='logo' width={0} height={0} sizes='100vh'/> */}
            </Link>
            <TopMenuItem title='Campground' pageRef='/campground'/>
            <TopMenuItem title='Manage' pageRef='/booking/manage'/>
            <div className='absolute right-0 h-full flex flex-row'>
                <TopMenuItem title='My Booking' pageRef='/mybooking'/>
            {
                session? <Link href="/api/auth/signout"><div className='flex items-center h-full px-2 text-orange-400 text-sm'>
                    Sign-Out of {session.user?.name}</div></Link>
                : <div className='flex flex-row-reverse'><Link href="/api/auth/signin"><div className='flex items-center h-full px-2 text-orange-400 text-sm'>Sign-In</div></Link>
                <Link href="/api/auth/register"><div className='flex items-center h-full px-2 text-orange-400 text-sm'>Register</div></Link>
                </div>
            }
            </div>
        </div>
    ) ;
}