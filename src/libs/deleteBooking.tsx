'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"
import { revalidatePath } from "next/cache"

export async function deleteBooking(formData: FormData) {
    const session = await getServerSession(authOptions)
    
    const token = (session?.user as any)?.accessToken;

    if (!token) {
        console.log("No token found in session");
        return;
    }

    const id = formData.get("id");
    if (!id) return;

    try {
        const response = await fetch(`http://campgroundbackend.us-east-1.elasticbeanstalk.com/api/v1/bookings/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete booking");
        }

        revalidatePath("/booking");
        
    } catch (error) {
        console.error("Delete error:", error);
    }
}