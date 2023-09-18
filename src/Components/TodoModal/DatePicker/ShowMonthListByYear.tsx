import React, {  } from "react";
import { MonthList } from "./MonthList";
import { MonthShortHand } from "src/interface";
type Props = {
  year: number;
  currentMonth: number;
  currentDate: Date;
};
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
/**
 *
 * @param props include: current year, current month (0 - 11), current date
 * @returns List of months from current month to last month
 */
export const ShowMonthListByYear: React.FC<Props> = ({
  year,
  currentMonth,
  currentDate,
}) => {
  return (
    <div>
      {months.map((month) => {
        if (month >= currentMonth) {
          return (
            <div key={`${month + 1}/${year}`}>
              <MonthList
                year={year}
                month={month}
                currentDate={currentDate}
              />
              <p className="font-large text-extra-small m-[10px]">
                {MonthShortHand[month + 1]}
              </p>
              <hr className="my-[6px]" />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
