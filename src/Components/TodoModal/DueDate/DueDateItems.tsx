import { useContext } from "react";
import { useDate } from "src/Hooks/use-date";

import "./DueDate.scss";
import { DatePicker } from "../DatePicker/DatePicker";
import { TodoContext } from "src/Context/TodoContext";


export const DueDateItems = () => {
  const { today } = useDate();
  

  const {dueDate, setDueDate, setShowDueDate, setIsOpenDueDate, dateList} = useContext(TodoContext);

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
        {dateList?.map((dateItem: any) => (
          <li key={dateItem.id} className="date-item" onClick={() => {
            setDueDate(dateItem.date);
            setShowDueDate({
              color: dateItem.color,
              text: dateItem.content === "No Date" ? "Due Date" : dateItem.content
            })
            setIsOpenDueDate(false);
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
