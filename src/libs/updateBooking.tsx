export default async function updateBooking(id: string, data: any, token: string) {
    const res = await fetch(`http://campgroundbackend.us-east-1.elasticbeanstalk.com/api/v1/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
}