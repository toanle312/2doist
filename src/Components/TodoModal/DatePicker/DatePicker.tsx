import React, { useMemo } from "react";
import "./DatePicker.scss";
import { MonthList } from "./MonthList";
import { ShowMonthListByYear } from "./ShowMonthListByYear";

type Props = {
  today: string;
};

const dateInWeek = ["MON", "TUE", "WED", "TH", "FRI", "SA", "SU"];

export const DatePicker: React.FC<Props> = ({ today }) => {
  const currentDate = useMemo(() => {
    return new Date(today);
  }, [today]);
  return (
    <div className="date-picker">
      <div className="date-picker__header">
        <p className="font-large text-small">{today}</p>
      </div>
      <div className="date-picker__date">
        {dateInWeek.map((date) => {
          return (
            <p key={date} className="basis-[14.285%] text-extra-small flex-1 text-center">
              {date[0]}
            </p>
          );
        })}
      </div>
      <hr className="my-[6px]" />
      <div className="date-picker__month-list">
        <ShowMonthListByYear
          year={currentDate.getFullYear()}
          currentMonth={currentDate.getMonth()} //getMonth(): return month of year from 0 - 11
          currentDate={currentDate}
        />
      </div>
    </div>
  );
};
