import React, { useContext, useEffect, useMemo } from "react";
import "./UpComingDatePicker.scss";
import { ShowUpComingMonthListByYear } from "./ShowUpComingMonthListByYear";
import { MonthShortHand } from "@/interface";
import { DatePickerContext } from "@/Context/DatePickerContext";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
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
export const UpComingDatePicker: React.FC<Props> = ({ today }) => {
  const { month, year, setMonth, setYear, currentHoverDate, numberOfTasks } =
    useContext(DatePickerContext);

  const { isDarkTheme } = useContext(ThemeContext);

  // Update today
  const currentDate = useMemo(() => {
    return new Date(today);
  }, [today]);

  useEffect(() => {
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
  }, [today]);

  return (
    <div className="upcoming-date-picker overflow-hidden">
      <div className="upcoming-date-picker__header flex justify-between">
        <p className="font-large text-3xl">
          {year === 0 ? "..." : MonthShortHand[month] + " " + year}
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
              className={`w-[12px] h-[12px] mx-1 border-solid ${
                isDarkTheme ? "border-white" : "border-black"
              } border-[2px] rounded-full`}
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
        <span className="text-lg text-textGray flex justify-center">
          {currentHoverDate} &#x2022;&nbsp;
          <span className="font-bold">
            {numberOfTasks} {numberOfTasks > 1 ? "tasks " : "task "} due
          </span>
        </span>
      ) : (
        <div className="upcoming-date-picker__date mt-4">
          {/* Show date in week */}
          {dateInWeek.map((date) => {
            return (
              <p
                key={date}
                className="basis-[14.285%] text-lg flex-1 text-center"
              >
                {date}
              </p>
            );
          })}
        </div>
      )}
      <hr className="mt-[6px]" />
      <div className="upcoming-date-picker__month-list relative">
        {/* Show all month from current month to the month end of the year */}
        <ShowUpComingMonthListByYear
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
