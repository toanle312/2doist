import React, { useMemo, useState } from "react";
import { useDate } from "src/Hooks/use-date";
import type { Dayjs } from "dayjs";
import {
  tomorrow as tomorrowIcon,
  today as todayIcon,
  nextWeek as nextWeekIcon,
  nextWeekend as nextWeekendIcon,
  noDate,
} from "src/assets";
import "./DueDate.scss";
import { CalendarProps } from "antd";
import { Calendar } from "react-calendar";
import { DatePicker } from "../DatePicker/DatePicker";

export const DueDateItems = () => {
  const { today, tomorrow, nextWeek, nextWeekend } = useDate();
  const dateList = useMemo(() => {
    return [
      {
        id: "Today",
        icon: todayIcon,
        date: today,
        content: "Today",
      },
      {
        id: "Tomorrow",
        icon: tomorrowIcon,
        date: tomorrow,
        content: "Tomorrow",
      },
      {
        id: "Next weekend",
        icon: nextWeekendIcon,
        date: nextWeekend,
        content: "Next weekend",
      },
      {
        id: "Next week",
        icon: nextWeekIcon,
        date: nextWeek,
        content: "Next week",
      },
      {
        id: "No Date",
        icon: noDate,
        date: "",
        content: "No Date",
      },
    ];
  }, [today, tomorrow, nextWeek, nextWeekend]);

  return (
    <div className="w-full max-w-[300px] max-h-[600px]">
      <input
        placeholder="Type a due date"
        className="w-full outline-none pb-3"
      />
      <hr />
      <ul>
        {dateList?.map((dateItem) => (
          <li key={dateItem.id} className="date-item">
            <img src={dateItem.icon} alt="Date Icon" />
            <p className="flex-1 font-medium text-textColor text-small">
              {dateItem.content}
            </p>
            <p className="text-textGray text-small">{dateItem.date}</p>
          </li>
        ))}
      </ul>
      <hr />

      <DatePicker today={today} />
    </div>
  );
};
