import React, { useContext, useEffect, useMemo } from "react";
import "./DatePicker.scss";
import { ShowMonthListByYear } from "./ShowMonthListByYear";
import { MonthShortHand } from "@/interface";
import { DatePickerContext } from "@/Context/DatePickerContext";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { TodoContext } from "@/Context/TodoContext";
import { ThemeContext } from "@/Context/ThemeContext";

type Props = {
  today: string;
};

const dateInWeek = ["MON", "TUE", "WED", "TH", "FRI", "SA", "SU"];
const start = new Date().getFullYear();
const end = start + 1;

/**
 *
 * @param props includes today: current date
 * @returns Table of month in years to choose date
 */
export const DatePicker: React.FC<Props> = ({ today }) => {
  const { month, year, setMonth, setYear, currentHoverDate, numberOfTasks } =
    useContext(DatePickerContext);
  const { todo } = useContext(TodoContext);
  const { isDarkTheme } = useContext(ThemeContext);

  // Update today
  const currentDate = useMemo(() => {
    return new Date(today);
  }, [today]);

  useEffect(() => {
    const date = todo.dueDate ? new Date(todo.dueDate) : currentDate;
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, [today]);

  return (
    <div className="date-picker overflow-hidden">
      <div className="date-picker__header flex justify-between">
        <p className="font-large text-small">
          {MonthShortHand[month] + " " + year}
        </p>
        <section className="flex gap-4 items-center">
          <button
            className={`${
              isDarkTheme ? "hover:bg-primary" : "hover:bg-gray-200"
            } px-1 rounded-md ${
              month <= new Date(today).getMonth() &&
              year <= new Date(today).getFullYear()
                ? "disabled"
                : ""
            } `}
            onClick={() => {
              const query = `[data-date="${month === 0 ? 11 : month - 1}/${
                month === 0 ? year - 1 : year
              }"]`;
              document
                .querySelector(query)
                ?.scrollIntoView({ block: "start", behavior: "instant" });
            }}
          >
            <LeftOutlined />
          </button>
          <button
            className={`${
              isDarkTheme ? "hover:bg-primary" : "hover:bg-gray-200"
            } px-1 w-full h-full rounded-md`}
            onClick={() => {
              document
                .getElementById("current-month-choose")
                ?.scrollIntoView({ block: "start", behavior: "instant" });
            }}
          >
            <div
              className={`w-[8px] h-[8px] mx-1 border-solid ${
                isDarkTheme ? "border-white" : "border-black"
              } border-[1px] rounded-full`}
            ></div>
          </button>
          <button
            className={`${
              isDarkTheme ? "hover:bg-primary" : "hover:bg-gray-200"
            } px-1 rounded-md`}
            onClick={() => {
              const query = `[data-date="${month === 11 ? 0 : month + 1}/${
                month === 11 ? year + 1 : year
              }"]`;
              document
                .querySelector(query)
                ?.scrollIntoView({ block: "start", behavior: "instant" });
            }}
          >
            <RightOutlined />
          </button>
        </section>
      </div>
      {currentHoverDate ? (
        <span className="text-extra-small text-textGray flex justify-center">
          {currentHoverDate} &#x2022;&nbsp;
          <span className="font-bold">
            {numberOfTasks} {numberOfTasks > 1 ? "tasks " : "task "} due
          </span>
        </span>
      ) : (
        <div className="date-picker__date">
          {/* Show date in week */}
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
      )}
      <hr className="mt-[6px]" />
      <div className="date-picker__month-list relative">
        {/* Show all month from current month to the month end of the year */}
        <ShowMonthListByYear
          currentYear={currentDate.getFullYear()}
          currentMonth={currentDate.getMonth()} //getMonth(): return month of year from 0 - 11
          currentDate={currentDate}
          from={start}
          to={end}
        />
      </div>
    </div>
  );
};
