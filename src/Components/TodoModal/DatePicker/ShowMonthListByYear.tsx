import React, { useContext } from "react";
import { MonthList } from "./MonthList";

type Props = {
  year: number;
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
  year,
  currentMonth,
  currentDate,
  from,
  to,
}) => {
  let months = [] as { m: number; y: number }[];

  while (from <= to) {
    months = [...months].concat(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
        return {
          m: month,
          y: from,
        };
      })
    );
    from = from + 1;
  }

  const filterMonths = months.filter(
    (d) => (d.m >= currentMonth && d.y === year) || d.y > year
  );

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
