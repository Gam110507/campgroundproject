export default async function getCampground(id:string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/campgrounds/${id}`)
    if(!response.ok) {
        throw new Error("Failed to fetch campground") ;
    }

    return await response.json() ;
}