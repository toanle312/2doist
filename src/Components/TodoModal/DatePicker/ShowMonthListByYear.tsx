import React from "react";
import { MonthList } from "./MonthList";

type Props = {
  year: number;
  currentMonth: number;
  currentDate: Date;
  startPos?: number;
};
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
/**
 *
 * @param props include: current year, current month (0 - 11), current date
 * @returns List of months from current month to last month of the current year
 */
export const ShowMonthListByYear: React.FC<Props> = ({
  year,
  currentMonth,
  currentDate,
}) => {
  return months
    .filter((month) => month >= currentMonth)
    .map((month) => {
      return (
        <MonthList
          key={`${month + 1}/${year}`}
          year={year}
          month={month}
          currentDate={currentDate}
        />
      );
    });
};
