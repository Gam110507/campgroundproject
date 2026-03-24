
export default async function getCampgrounds() {

    const response = await fetch("${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/campgrounds", {next: {tags:['campgrounds']}})
    if(!response.ok) {
        throw new Error("Failed to fetch campgrounds") ;
    }

    return await response.json() ;
}