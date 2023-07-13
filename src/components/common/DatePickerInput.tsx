import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface IDatePickerInput {
  date: string | null;
  maxDate?: string;
  minDate?: string;
  onChange: (date: string) => void;
}

const DatePickerInput = ({ date, minDate = "", maxDate = "", onChange }: IDatePickerInput) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>(date ? dayjs(date) : null);

  return (
    <div className="datePicker">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          value={dateValue}
          maxDate={dayjs(maxDate)}
          minDate={dayjs(minDate)}
          onChange={(newValue) => {
            setDateValue(newValue);
            onChange(dayjs(newValue).format("YYYYMMDD"));
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
export default DatePickerInput;
