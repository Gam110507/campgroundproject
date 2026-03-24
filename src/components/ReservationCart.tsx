import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getBookings from "@/libs/getBookings"
import { deleteBooking } from "@/libs/deleteBooking"
import Link from "next/link"

export default async function ReservationCart() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.name) return <div>Please login</div>

    const bookings = await getBookings((session.user as any).accessToken)
    if(!bookings.data || bookings.data.length === 0) {
        return (
            <div className="text-center mt-10">No Campground Booking</div>
        );
    }
    return (
        <>
        {
            bookings.data.map((bookingItem: any) => (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem._id}>
                    <div className="text-xl">{bookingItem.campground.name}</div>
                    <div className="text-sm">User: {bookingItem.user}</div>
                    <div className="text-sm">Booking Date: {bookingItem.bookingDate}</div>
                    <div className="text-md">Number of Nights: {bookingItem.numberOfNights}</div>

                    <div className="flex gap-2 mt-2">
                        <form action={deleteBooking}>
                            <input type="hidden" name="id" value={bookingItem._id}/>
                            <button className="rounded-md bg-red-500 hover:bg-red-700 px-3 py-2 text-white shadow-sm">
                                Remove Booking
                            </button>
                        </form>
                    
                        <Link href={`/booking/?bid=${bookingItem._id}&&id=${bookingItem.campground._id}&&campground=${bookingItem.campground.name}`}>
                        <button className="rounded-md bg-red-500 hover:bg-red-700 px-3 py-2 text-white shadow-sm">Edit Booking</button>
                        </Link>
                    </div>
                </div>
            ))
        }
        </>
    )
}