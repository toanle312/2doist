import DatePickerProvider from "@/Context/DatePickerContext";
import { UpComingDatePicker } from "../UpcomingDatePicker/UpComingDatePicker";

const Upcoming = () => {
  const today = new Date().toDateString();

  return (
    <DatePickerProvider>
      <UpComingDatePicker today={today} />
    </DatePickerProvider>
  );
};
export default Upcoming;
