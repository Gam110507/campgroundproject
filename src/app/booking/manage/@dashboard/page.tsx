import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import getUserProfile from "@/libs/getUserProfile";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import Campground from "@/db/models/Campground";

export default async function DashboardPage() {

    const addCampground = async (addCampgroundForm:FormData) => {
        'use server'
        const name = addCampgroundForm.get("campground") ;
        const address = addCampgroundForm.get("address") ;
        const district = addCampgroundForm.get("district") ;
        const province = addCampgroundForm.get("province") ;
        const postalcode = addCampgroundForm.get("postalcode") ;
        const tel = addCampgroundForm.get("tel") ;
        const region = addCampgroundForm.get("region") ;
        const picture = addCampgroundForm.get("picture") ;

        try {
            await dbConnect() ;
            const campground = await Campground.create({
                "name":name,
                "address":address,
                "district":district,
                "province":province,
                "postalcode":postalcode,
                "tel":tel,
                "region":region,
                "picture":picture,
            })

        } catch(error) {
            console.log(error)
        }
        revalidateTag("campgrounds") ;
        redirect("/campground")
    }

    const session = await getServerSession(authOptions) ;
    const token = (session?.user as any)?.accessToken;

    if(!session || !token) return null ;

    const profile = await getUserProfile(token) ;
    var createdAt = new Date(profile.data.createdAt) ;

    return (
        <main className="bg-orange-100 m-5 p-8 rounded w-[50%] flex flex-col self-center">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2">
                <tbody>
                    <tr><td>Email</td><td>{profile.data.email}</td></tr>
                    <tr><td>Tel.</td><td>{profile.data.telephone}</td></tr>
                    <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
                </tbody>
            </table>
            {
                (profile.data.role=="admin")?
                <form action={addCampground} className="flex flex-col items-center">
                    <div className="text-xl text-orange-400">Create Campground</div>
                    <div className="flex items-center w-full my-2 ">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="campground">Campground</label>
                        <input type="text" required id="campground" name="campground" placeholder="Campground Name" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2 ">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">Picture</label>
                        <input type="text" required id="picture" name="picture" placeholder="Picture URL" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2 ">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="address">Address</label>
                        <input type="text" required id="address" name="address" placeholder="Campground address" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2 ">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="district">District</label>
                        <input type="text" required id="district" name="district" placeholder="Campground district" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        <label className="w-auto block text-gray-700 pr-4 pl-6" htmlFor="province">Province</label>
                        <input type="text" required id="province" name="province" placeholder="Campground province" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2 ">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="postalcode">Postal Code</label>
                        <input type="text" required id="postalcode" name="postalcode" placeholder="Campground postalcode" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        <label className="w-auto block text-gray-700 pr-4 pl-6" htmlFor="region">Region</label>
                        <input type="text" required id="region" name="region" placeholder="Campground region" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2 ">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">Tel</label>
                        <input type="text" required id="tel" name="tel" placeholder="Contact-Number" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <button type="submit" className="bg-orange-400 hover:bg-orange-600 text-white p-2 rounded">Add New Campground</button>
                </form>
                : null
            }
        </main>
    ) ;
}