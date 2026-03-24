import { getApiUrl } from "./api";

export default async function updateBooking(id: string, data: any, token: string) {
    const res = await fetch(`${getApiUrl()}/api/v1/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
}