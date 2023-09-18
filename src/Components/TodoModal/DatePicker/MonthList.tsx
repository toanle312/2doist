import React, { useMemo, useContext } from "react";
import "./DatePicker.scss";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "src/Context/TodoContext";
import { DaysInWeek } from "src/interface";
import { getCurrentDayInWeek, getDaysInMonth } from "src/Utils";

type Props = {
  year: number;
  month: number;
  currentDate?: Date;
};

/**
 *
 * @param currentDate current date
 * @param year current year
 * @param month current month (0 - 11)
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
 * @param month current month (0 - 11)
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

  const { dueDate, setDueDate, setIsOpenDueDate, setShowDueDate, dateList } =
    useContext(TodoContext);

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
                dueDate === new Date(year, month, day + 1).toDateString()
                  ? "active-date"
                  : "hover-date"
              }`}
              onClick={() => {
                const date = new Date(year, month, day + 1).toDateString();
                const findDate = dateList.find(
                  (dateItem) => dateItem.date === date
                );
                if (findDate) {
                  setDueDate(findDate.date);
                  setShowDueDate({
                    color: findDate.color,
                    text:
                      findDate.content === "No Date"
                        ? "Due Date"
                        : findDate.content,
                  });
                } else {
                  setDueDate(date);
                  setShowDueDate({
                    color: "#692ec2",
                    text: DaysInWeek[getCurrentDayInWeek(year, month, day + 1)],
                  });
                }
                setIsOpenDueDate(false);
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
