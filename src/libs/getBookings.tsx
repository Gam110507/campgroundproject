export default async function getBookings(token: string) {
    const res = await fetch("http://campgroundbackend.us-east-1.elasticbeanstalk.com/api/v1/bookings", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    })

    if (!res.ok) throw new Error("Failed to fetch bookings")

    return res.json()
}