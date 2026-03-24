import ProductCard from "./ProductCard"
import Link from "next/link"

export default async function CarCatalog({campgroundJson} : {campgroundJson:Object}) {
    const campgroundJsonReady = campgroundJson ;
    console.log(campgroundJsonReady) ;
    return (
        <>
        Explore {campgroundJsonReady.count} campgrounds in our catalog
        <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
            {
                campgroundJsonReady.data.map((campgroundItem:Object)=>(
                    <Link href={`/campground/${campgroundItem.id}`} className="w-[100%] sm:w-[50%] md:[30%] lg:w-[30%] p-2 sm:p-4 md:p-4 lg:p-8" key={campgroundItem.id}>
                    <ProductCard campgroundName={campgroundItem.name} 
                    imgSrc={campgroundItem.picture}
                    />
                    </Link>
                ))
            }
        </div>
        </>
    )
}