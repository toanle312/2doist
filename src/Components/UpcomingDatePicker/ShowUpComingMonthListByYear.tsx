import React from "react";
import { UpComingMonthList } from "./UpComingMonthList";
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
export const ShowUpComingMonthListByYear: React.FC<Props> = ({
  currentYear,
  currentMonth,
  currentDate,
  from,
  to,
}) => {
  const filterMonths = getAllMonths(from, to, currentMonth, currentYear);

  return filterMonths?.map((d) => {
    return (
      <UpComingMonthList
        key={`${d.m + 1}/${d.y}`}
        year={d.y}
        month={d.m}
        currentDate={currentDate}
      />
    );
  });
};
