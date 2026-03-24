export default async function createBooking(id: string, data: any, token: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/campgrounds/${id}/bookings`,
        {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify({
                user: data.user,
                numberOfNights: data.numberOfNights,
                bookingDate: data.bookingDate,
            }),
        }
    )
    console.log(data)
    
    if (!response.ok) {
        throw new Error("Failed to create booking")
    }

    return await response.json()
}