import { getApiUrl } from "./api";
export default async function getCampgrounds() {

    const response = await fetch(`${getApiUrl()}/api/v1/campgrounds`, {next: {tags:['campgrounds']}})
    if(!response.ok) {
        throw new Error("Failed to fetch campgrounds") ;
    }

    return await response.json() ;
}