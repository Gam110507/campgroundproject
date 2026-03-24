import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interfaces";

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems:[] } ;

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<BookingItem>)=>{
            state.bookItems.push(action.payload)
        },
        removeBooking: (state, action:PayloadAction<BookingItem>)=>{
            const remainItems = state.bookItems.filter( obj => {
                return ( (obj.campground !== action.payload.campground) || (obj.bookingDate !== action.payload.bookingDate) || (obj.user !== action.payload.user) )
            } )
            state.bookItems = remainItems ;
        }
    }
})

export const { addBooking, removeBooking } = bookSlice.actions ;
export default bookSlice.reducer ;