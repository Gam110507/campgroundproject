export default async function getBookingById(id: string, token: string) {
    const res = await fetch(`http://campgroundbackend.us-east-1.elasticbeanstalk.com/api/v1/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}