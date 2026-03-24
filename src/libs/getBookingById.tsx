import { getApiUrl } from "./api";

export default async function getBookingById(id: string, token: string) {
    const res = await fetch(`${getApiUrl()}/api/v1/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}