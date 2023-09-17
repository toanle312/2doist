import React, { useMemo, useState, useContext } from "react";
import { useDate } from "src/Hooks/use-date";
import {
  tomorrow as tomorrowIcon,
  today as todayIcon,
  nextWeek as nextWeekIcon,
  nextWeekend as nextWeekendIcon,
  noDate,
} from "src/assets";
import "./DueDate.scss";
import { DatePicker } from "../DatePicker/DatePicker";
import { TodoContext } from "src/Context/TodoContext";

export const DueDateItems = () => {
  const { today, tomorrow, nextWeek, nextWeekend } = useDate();
  const dateList = useMemo(() => {
    return [
      {
        id: "Today",
        icon: todayIcon,
        date: today,
        content: "Today",
        color: "#4b9244"
      },
      {
        id: "Tomorrow",
        icon: tomorrowIcon,
        date: tomorrow,
        content: "Tomorrow",
        color: "#ad6200"

      },
      {
        id: "Next weekend",
        icon: nextWeekendIcon,
        date: nextWeekend,
        content: "Next weekend",
        color: "#246fe0"

      },
      {
        id: "Next week",
        icon: nextWeekIcon,
        date: nextWeek,
        content: "Next week",
        color: "#69cec2"
      },
      {
        id: "No Date",
        icon: noDate,
        date: "",
        content: "No Date",
        color: ""
      },
    ];
  }, [today, tomorrow, nextWeek, nextWeekend]);

  const {dueDate, setDueDate, setShowDueDate} = useContext(TodoContext);

  return (
    <div className="w-full max-w-[250px] max-h-[600px]">
      <input
        placeholder="Type a due date"
        className="w-full outline-none pb-3"
        value={dueDate}
        onChange={(e) => {setDueDate(e.target.value)}}
      />
      <hr />
      <ul>
        {dateList?.map((dateItem) => (
          <li key={dateItem.id} className="date-item" onClick={() => {
            setDueDate(dateItem.date);
            setShowDueDate({
              color: dateItem.color,
              text: dateItem.content === "No Date" ? "Due Date" : dateItem.content
            })
          }}>
            <img src={dateItem.icon} alt="Date Icon" />
            <p className="flex-1 font-medium text-textColor text-extra-small">
              {dateItem.content}
            </p>
            <p className="text-textGray text-extra-small">{dateItem.date}</p>
          </li>
        ))}
      </ul>
      <hr />

      <DatePicker today={today} />
    </div>
  );
};
