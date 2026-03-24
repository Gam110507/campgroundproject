"use client"
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interfaces";
import { addBooking } from "@/redux/features/bookSlice";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import createBooking from "@/libs/createBooking";
import getBookingById from "@/libs/getBookingById";
import updateBooking from "@/libs/updateBooking";

export default function Bookings() {
  const urlParams = useSearchParams();
  const bookingId = urlParams.get("bid"); 
  const cid = urlParams.get("id");       
  const campground = urlParams.get("campground"); 

  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [numberOfNights, setNumberOfNights] = useState(0);

useEffect(() => {
  const token = (session?.user as any)?.accessToken;
  if (bookingId && token) {
    getBookingById(bookingId, token)
      .then((res) => {
        if (res.data) {
          setBookingDate(dayjs(res.data.bookingDate));
          setNumberOfNights(res.data.numberOfNights);
        }
      })
      .catch(console.error);
  }
}, [bookingId, session]);

const handleSubmit = async () => {
  const token = (session?.user as any)?.accessToken;

  if (!cid || !campground || !bookingDate || numberOfNights <= 0) {
    alert("Please fill all fields correctly");
    return;
  }

  if (!token) {
    alert("Please log in first");
    return;
  }

  try {
    const profile = await getUserProfile(token);

    if (bookingId) {
      const payload = {
        bookingDate: dayjs(bookingDate).format("YYYY-MM-DD"),
        numberOfNights,
      };
      await updateBooking(bookingId, payload, token);
    } else {
      const item: BookingItem = {
        campgroundId: cid,
        campground: campground,
        user: profile.data._id,
        numberOfNights,
        bookingDate: dayjs(bookingDate).format("YYYY-MM-DD"),
      };
      await createBooking(cid, item, token);
      dispatch(addBooking(item));
    }
  } catch (err) {
    console.error("Submit Error:", err);
    alert("Something went wrong");
  }
};

  return (
    <main className="flex flex-col gap-y-4 m-6 w-[50%] rounded bg-orange-100 p-4 mx-auto items-center">
      <div className="text-xl font-semibold">{bookingId ? "Edit Booking" : "New Booking"}</div>
      <div className="text-xl font-medium">Campground: {campground}</div>

      <div className="w-[50%] gap-y-2 flex flex-col">
        <div className="text-md text-left text-gray-600">Booking Date</div>
        <LocationDateReserve
          onDateChange={(value: Dayjs) => setBookingDate(value)}
          value={bookingDate}
        />
      </div>

      <div className="w-[50%] gap-y-2 flex flex-col">
        <div className="text-md text-left text-gray-600">Number of Nights</div>
        <input
          type="number"
          value={numberOfNights}
          onChange={(e) => setNumberOfNights(parseInt(e.target.value))}
          placeholder="Number of nights"
          min={0}
          className="bg-white border-2 border-gray-200 rounded-lg w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"
        />
      </div>

      <button
        className="block rounded-md bg-orange-400 hover:bg-orange-600 px-3 py-2 text-white shadow-sm"
        onClick={handleSubmit}
      >
        {bookingId ? "Update Booking" : "Book this Campground"}
      </button>
    </main>
  );
}