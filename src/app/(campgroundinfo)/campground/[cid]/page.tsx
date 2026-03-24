import Image from "next/image";
import getCampground from "@/libs/getCampground";
import Link from "next/link";

export default async function CarDetailPage( {params} : { params: Promise<{cid:string}> }) {
    const { cid } = await params;
    const campgroundDetail = await getCampground(cid) ;

    
    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{campgroundDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={ campgroundDetail.data.picture } alt="Campground Image" width={0} height={0} sizes="100vw" className="rounded-lg w-[30%]"/>
                <div className="text-md ml-5 text-left">
                    {/* {carDetail.data.description} */}
                    <div className="text-md ml-5">Address: {campgroundDetail.data.address}</div>
                    <div className="text-md ml-5">District: {campgroundDetail.data.district}</div>
                    <div className="text-md ml-5">Province: {campgroundDetail.data.province}</div>
                    <div className="text-md ml-5">Postal Code: {campgroundDetail.data.postalcode}</div>
                    <div className="text-md ml-5">Tel: {campgroundDetail.data.tel}</div>
                    <div className="text-md ml-5">Region: {campgroundDetail.data.region}</div>
                <Link href={`/booking?id=${cid}&campground=${campgroundDetail.data.name}`}>
                      <button className="ml-5 block rounded-md bg-orange-400 hover:bg-orange-600 px-3 py-2 text-white shadow-sm">Make Booking</button>
                </Link>
                </div>
            </div>
        </main>
    );
}

// export async function generateStaticParams() {
//     return [{cid:'001'}, {cid:'002'}, {cid:'003'}, {cid:'004'}] ;
// }