import { useContext } from "react";
import { useDate } from "src/Hooks/use-date";

import "./DueDate.scss";
import { DatePicker } from "../DatePicker/DatePicker";
import { TodoContext } from "src/Context/TodoContext";
import { TDateList } from "src/interface";
import { TODO_PROPERTIES } from "src/Utils";

export const DueDateItems = () => {
  const { today } = useDate();

  const {
    todo,
    handleChangeTodo,
    setShowDueDate,
    setIsOpenDueDate,
    dateList,
  } = useContext(TodoContext);

  const handleChooseDate = (dateItem: TDateList) => {
    handleChangeTodo(TODO_PROPERTIES.DUE_DATE, dateItem.date);
    setShowDueDate({
      color: dateItem.color,
      text: dateItem.content === "No Date" ? "Due Date" : dateItem.content,
    });
    setIsOpenDueDate(false);
  };

  return (
    <div className="w-full max-w-[250px] max-h-[600px]">
      <input
        placeholder="Type a due date"
        className="w-full outline-none pb-3"
        value={todo.dueDate}
        name="dueDate"
        onChange={(e) => {
          handleChangeTodo(e.target.name, e.target.value);
        }}
      />
      <hr />
      {/* Show quick access for date */}
      <ul>
        {dateList?.map((dateItem: any) => (
          <li
            key={dateItem.id}
            className="date-item"
            onClick={() => {
              handleChooseDate(dateItem);
            }}
          >
            <img src={dateItem.icon} alt="Date Icon" />
            <p className="flex-1 font-medium text-textColor text-extra-small">
              {dateItem.content}
            </p>
            <p className="text-textGray text-extra-small">{dateItem.date}</p>
          </li>
        ))}
      </ul>
      <hr />
      {/* Show Date Picker */}
      <DatePicker today={today} />
    </div>
  );
};
