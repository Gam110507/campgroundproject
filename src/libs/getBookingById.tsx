export default async function getBookingById(id: string, token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}