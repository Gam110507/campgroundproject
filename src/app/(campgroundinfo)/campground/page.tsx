import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Campground() {
    const campgrounds = await getCampgrounds() ;

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Campground</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
            <CampgroundCatalog campgroundJson={campgrounds}/>
            </Suspense>

        </main> 
    ) ;
}