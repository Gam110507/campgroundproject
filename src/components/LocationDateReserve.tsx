'use client'
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers" ;
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs" ;
import { Dayjs } from "dayjs";

interface Props {
    onDateChange: Function,
    value?: Dayjs | null;
}

export default function LocationDateReserve({ onDateChange, value }: Props) {
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(value || null);

    useEffect(() => {
        setReserveDate(value || null);
    }, [value]);

    return (
        <div className='bg-orange-50 rounded-lg gap-x-5 gap-y-2 w-full px-10 py-5 flex flex-row justify-center'>
            <LocalizationProvider dateAdapter={AdapterDayjs}> 
                <DatePicker
                    className='bg-white'
                    value={reserveDate}
                    onChange={(val) => {
                        setReserveDate(val);
                        onDateChange(val);
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}