import React, { useMemo, useContext, useRef, useEffect, useState } from "react";
import "./UpComingDatePicker.scss";
import { v4 as uuidv4 } from "uuid";
import { MonthShortHand } from "@/interface";
import {
  getCurrentDayInWeek,
  getDaysInMonth,
  getTasksCountByDate,
} from "@/Utils";
import { DatePickerContext } from "@/Context/DatePickerContext";
import { ThemeContext } from "@/Context/ThemeContext";
import { useAppSelector } from "@/Hooks";
import TodoModalByDay from "../TodoModalByDay/TodoModalByDay";

type Props = {
  year: number;
  month: number;
  currentDate?: Date;
  startPos?: number;
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
export const UpComingMonthList: React.FC<Props> = ({
  year,
  month,
  currentDate,
}) => {
  const { setMonth, setYear, setCurrentHoverDate, setNumberOfTasks } =
    useContext(DatePickerContext);

  const todos = useAppSelector((state) => state.todos.todos);

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

  // save ref of each month shown in the calendar
  const ref = useRef<HTMLDivElement>(null);

  // calculate check point
  const startPosition = document
    .querySelector(".upcoming-date-picker hr")
    ?.getBoundingClientRect().top as number;

  // handle scroll to change show month and year
  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        const currentPosition = ref.current?.getBoundingClientRect()
          .top as number;

        if (currentPosition - 10 <= startPosition) {
          setMonth(month);
          setYear(year);
        }
      },
      true
    );

    return () => {
      removeEventListener("scroll", () => {
        console.log("REMOVE EVENT");
      });
    };
  }, [ref, month, setMonth, startPosition, setYear, year]);

  // handle to add id for current month
  useEffect(() => {
    if (
      month === currentDate?.getMonth() &&
      year === currentDate.getFullYear() &&
      ref.current
    ) {
      ref.current.id = "current-month-choose";
    } else {
      ref.current?.removeAttribute("id");
    }
  }, [ref]);

  const { isDarkTheme } = useContext(ThemeContext);
  const [isOpenTodoModalByDay, setIsOpenTodoModalByDay] =
    useState<boolean>(false);
  const [chosenDate, setChosenDate] = useState<Date>();
  return (
    <div>
      {(month !== currentDate?.getMonth() ||
        (month === currentDate?.getMonth() &&
          year !== currentDate?.getFullYear())) && (
        <>
          {/* Hide month and year for current month of current year */}
          <p className="font-medium text-xl m-[10px]">
            {MonthShortHand[month]}
          </p>
          <hr className="my-[6px]" />
        </>
      )}
      {/* Show all date in month -> sort by day in week */}
      <div
        className="flex flex-wrap"
        ref={ref}
        tabIndex={0}
        data-date={`${month}/${year}`}
      >
        {days.map((day) => {
          if (day >= 0) {
            return (
              <span
                key={`${day + 1}/${month + 1}/${year}`}
                className={`basis-[14.285%] h-[120px] text-center text-xl cursor-pointer${
                  // only choose date after current date
                  isDisableDate(currentDate as Date, year, month, day + 1)
                    ? ` upcoming-disable-date`
                    : ""
                }${
                  // highlight current date
                  isCurrentDate(currentDate as Date, year, month, day + 1)
                    ? " text-primary font-medium"
                    : ""
                } upcoming-hover-date ${isDarkTheme && "dark-mode"}`}
                onClick={() => {
                  setChosenDate(new Date(year, month, day + 1));
                  setIsOpenTodoModalByDay(true);
                }}
                onMouseEnter={() => {
                  setCurrentHoverDate(
                    new Date(year, month, day + 1).toDateString()
                  );
                  setNumberOfTasks(() => {
                    const tasksCount = getTasksCountByDate(
                      todos,
                      new Date(year, month, day + 1).toDateString()
                    );
                    return tasksCount;
                  });
                }}
                onMouseLeave={() => {
                  setCurrentHoverDate("");
                  setNumberOfTasks(0);
                }}
              >
                <div className="relative py-[2px]">
                  <div>{day + 1}</div>
                  {getTasksCountByDate(
                    todos,
                    new Date(year, month, day + 1).toDateString()
                  ) > 0 ? (
                    <span className="absolute bottom-[-20px] right-0 left-0">
                      &#x2022;
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </span>
            );
          }
          return (
            // show empty field
            <span
              key={uuidv4()}
              className="basis-[14.285%] py-2 text-center text-lg"
            />
          );
        })}
      </div>
      {chosenDate && (
        <TodoModalByDay
          isOpenTodoModalByDay={isOpenTodoModalByDay}
          setIsOpenTodoModalByDay={setIsOpenTodoModalByDay}
          chosenDate={chosenDate}
        />
      )}
    </div>
  );
};
