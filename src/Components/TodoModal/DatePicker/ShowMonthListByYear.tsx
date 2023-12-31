import React from "react";
import { MonthList } from "./MonthList";
import { getAllMonths } from "@/Utils";

type Props = {
  currentYear: number;
  currentMonth: number;
  currentDate: Date;
  startPos?: number;
  from: number;
  to: number;
};
/**
 *
 * @param props include: current year, current month (0 - 11), current date
 * @returns List of months from current month to last month of the current year
 */
export const ShowMonthListByYear: React.FC<Props> = ({
  currentYear,
  currentMonth,
  currentDate,
  from,
  to,
}) => {
  const filterMonths = getAllMonths(from, to, currentMonth, currentYear);

  return filterMonths?.map((d) => {
    return (
      <MonthList
        key={`${d.m + 1}/${d.y}`}
        year={d.y}
        month={d.m}
        currentDate={currentDate}
      />
    );
  });
};
