import React, { useContext, useEffect, useMemo } from "react";
import "./DatePicker.scss";
import { ShowMonthListByYear } from "./ShowMonthListByYear";
import { MonthShortHand } from "@/interface";
import { DatePickerContext } from "@/Context/DatePickerContext";

type Props = {
  today: string;
};

const dateInWeek = ["MON", "TUE", "WED", "TH", "FRI", "SA", "SU"];

/**
 *
 * @param props includes today: current date
 * @returns Table of month in years to choose date
 */
export const DatePicker: React.FC<Props> = ({ today }) => {
  const { month, year, setMonth, setYear } = useContext(DatePickerContext);

  useEffect(() => {
    const date = new Date(today);
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, [today]);

  // Update today
  const currentDate = useMemo(() => {
    return new Date(today);
  }, [today]);

  return (
    <div className="date-picker overflow-hidden">
      <div className="date-picker__header">
        <p className="font-large text-small">
          {MonthShortHand[month] + " " + year}
        </p>
      </div>
      {/* Show date in week */}
      <div className="date-picker__date">
        {dateInWeek.map((date) => {
          return (
            <p
              key={date}
              className="basis-[14.285%] text-extra-small flex-1 text-center"
            >
              {date[0]}
            </p>
          );
        })}
      </div>
      <hr className="mt-[6px]" />
      <div className="date-picker__month-list relative">
        {/* Show all month from current month to the month end of the year */}
        <ShowMonthListByYear
          year={currentDate.getFullYear()}
          currentMonth={currentDate.getMonth()} //getMonth(): return month of year from 0 - 11
          currentDate={currentDate}
        />
        {/* Show all month in year */}
        <ShowMonthListByYear
          year={currentDate.getFullYear() + 1}
          currentMonth={0} //getMonth(): return month of year from 0 - 11
          currentDate={currentDate}
        />
      </div>
    </div>
  );
};
