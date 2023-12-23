import { useContext, useEffect } from "react";
import { useDate } from "@/Hooks/useDate";

import "./DueDate.scss";
import { DatePicker } from "@/Components/TodoModal/DatePicker/DatePicker";
import { TodoContext } from "@/Context/TodoContext";
import { TDateList } from "@/interface";
import { DUEDATE_TYPES, TODO_PROPERTIES } from "@/Utils";
import { DueDateContext } from "@/Context/DueDateContext";
import DatePickerProvider from "@/Context/DatePickerContext";
import { ThemeContext } from "@/Context/ThemeContext";

export const DueDateItems: React.FC = () => {
  const { today } = useDate();

  const { todo, handleChangeTodo, handleUpdateTodo } = useContext(TodoContext);
  const { setIsOpenDueDate, type, dateList, isOpenDueDate } =
    useContext(DueDateContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const handleChooseDate = (dateItem: TDateList) => {
    if (type === DUEDATE_TYPES.FULL) {
      handleChangeTodo(TODO_PROPERTIES.DUE_DATE, dateItem.date);
    } else {
      handleUpdateTodo({ ...todo, dueDate: dateItem.date });
    }
    setIsOpenDueDate(false);
  };

  return (
    <div className="w-full max-w-[250px] max-h-[600px]">
      <input
        placeholder="Type a due date"
        className="w-full outline-none pb-3 bg-transparent"
        value={todo.dueDate}
        name="dueDate"
        onChange={(e) => {
          handleChangeTodo(e.target.name, e.target.value);
        }}
      />
      <hr />
      {/* Show quick access for date */}
      <ul>
        {dateList
          ?.filter((item) => item.date !== todo.dueDate)
          .map((dateItem: any) => (
            <li
              key={dateItem.id}
              className={`date-item ${isDarkTheme ? "dark-mode" : ""}`}
              onClick={() => {
                handleChooseDate(dateItem);
              }}
            >
              <img src={dateItem.icon} alt="Date Icon" />
              <p className="flex-1 font-medium text-extra-small">
                {dateItem.content}
              </p>
              <p className="text-textGray text-extra-small">{dateItem.date}</p>
            </li>
          ))}
      </ul>
      <hr />
      {/* Show Date Picker */}
      <DatePickerProvider>
        <DatePicker today={today} />
      </DatePickerProvider>
    </div>
  );
};
