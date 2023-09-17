import React, { useEffect, useMemo, useState, useContext } from "react";
import "./DatePicker.scss";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "src/Context/TodoContext";

type Props = {
  year: number;
  month: number;
  currentDate?: Date;
};

/**
 *
 * @param year current year
 * @param month current month
 * @returns number of days in month of year
 */
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 0);

  if (!isNaN(date.getDate())) {
    return Array.from(Array(date?.getDate())?.keys());
  }
  return [];
};

/**
 *
 * @param year current year
 * @param month current month
 * @param day current day
 * @returns day of the week of current day (0 - 6: SUN - MON - ... - SAT)
 */
const getCurrentDayInWeek = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  return date.getDay();
};

/**
 *
 * @param currentDate current date
 * @param year current year
 * @param month current month
 * @param day current day
 * @returns check if current date is actual current date
 */
const isCurrentDate = (
  currentDate: Date,
  year: number,
  month: number,
  day: number
) => {
  if (
    currentDate?.getDate() === day &&
    currentDate?.getMonth() === month &&
    currentDate?.getFullYear() === year
  ) {
    return true;
  }
  return false;
};

/**
 *
 * @param currentDate current date
 * @param year current year
 * @param month current month
 * @param day current day
 * @returns check if each date in month is validated by the current date
 */
const isDisableDate = (
  currentDate: Date,
  year: number,
  month: number,
  day: number
) => {
  if (
    (currentDate?.getDate() as number) > day &&
    currentDate?.getMonth() === month &&
    currentDate?.getFullYear() === year
  ) {
    return true;
  }
  return false;
};

/**
 *
 * @param props include: current year, current month (0 - 11), current date
 * @returns List of dates in the month and days of the week
 */
export const MonthList: React.FC<Props> = ({ year, month, currentDate }) => {
  const days = useMemo(() => {
    const allDays = getDaysInMonth(year, month);

    // handle to show what day is it now
    {
      let dayBeforeFirstDate = getCurrentDayInWeek(year, month, 1)
        ? getCurrentDayInWeek(year, month, 1) - 1
        : 6;

      while (dayBeforeFirstDate--) {
        allDays.unshift(-1);
      }
    }

    return allDays;
  }, [month, year]);

  const {dueDate, setDueDate} = useContext(TodoContext);

  return (
    <div className="flex flex-wrap">
      {days.map((day) => {
        if (day >= 0) {
          return (
            <span
              key={`${day + 1}/${month + 1}/${year}`}
              className={`basis-[14.285%] py-[4px] px-[6px] text-center text-extra-small cursor-pointer ${
                isDisableDate(currentDate as Date, year, month, day + 1)
                  ? "disable-date"
                  : ""
              } ${
                isCurrentDate(currentDate as Date, year, month, day + 1)
                  ? "text-primary font-medium"
                  : ""
              } ${
                dueDate === new Date(year, month, day+1).toDateString()
                  ? "active-date"
                  : "hover-date"
              }`}
              onClick={() => {
                setDueDate(new Date(year, month, day+1).toDateString())
              }}
            >
              <p>{day + 1}</p>
            </span>
          );
        }
        return (
          <p
            key={uuidv4()}
            className="basis-[14.285%] py-2 text-center text-extra-small"
          />
        );
      })}
    </div>
  );
};
