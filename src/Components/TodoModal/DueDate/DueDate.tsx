import { Popover } from "antd";
import React, { useContext, useEffect } from "react";
import "./DueDate.scss";
import { CalendarOutlined } from "@ant-design/icons";
import { DueDateItems } from "./DueDateItems";
import { TodoContext } from "@/Context/TodoContext";
import { DUEDATE_TYPES, TODO_PROPERTIES } from "@/Utils";
import { DaysInWeek } from "@/interface";
import { DueDateContext } from "@/Context/DueDateContext";

type Props = {
  type: string;
  setIsEditDueDate?: React.Dispatch<React.SetStateAction<boolean>>;
  position?: string;
};

/**
 *
 * @param type type of the due date component (FULL or SHORT)
 * @param setIsEditDueDate (optional) function to open or close the due date component
 * @param position (optional) position of the due date component
 * @returns
 */
export const DueDate: React.FC<Props> = ({
  type,
  setIsEditDueDate,
  position = "leftBottom",
}) => {
  const { todo, handleChangeTodo } = useContext(TodoContext);

  const {
    isOpenDueDate,
    setIsOpenDueDate,
    showDueDate,
    setShowDueDate,
    dateList,
    setType,
  } = useContext(DueDateContext);

  useEffect(() => {
    setType(type as string);
  }, [type, setType]);

  // Scroll into view current month after open DueDate
  useEffect(() => {
    let timerId: any = undefined;
    if (isOpenDueDate) {
      timerId = setTimeout(() => {
        document
          .getElementById("current-month-choose")
          ?.scrollIntoView({ block: "start", behavior: "instant" });
      }, 300);
    }

    return () => {
      // clear timer id
      clearTimeout(timerId);
    };
  }, [isOpenDueDate]);

  const handleCancelDueDate = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleChangeTodo(TODO_PROPERTIES.DUE_DATE, "");
  };

  useEffect(() => {
    const findDate = dateList?.find(
      (dateItem) => dateItem.date === todo.dueDate
    );
    if (findDate) {
      setShowDueDate({
        color: findDate.color,
        text: findDate.content === "No Date" ? "Due Date" : findDate.content,
      });
    } else {
      setShowDueDate({
        color: "#692ec2",
        text: DaysInWeek[new Date(todo.dueDate).getDay()],
      });
    }
  }, [todo.dueDate, dateList]);

  useEffect(() => {
    if (isOpenDueDate === false) {
      setIsEditDueDate?.(false);
    }
  }, [isOpenDueDate, setIsEditDueDate]);

  return (
    <Popover
      placement={position as any}
      content={<DueDateItems />}
      arrow={false}
      trigger="click"
      open={isOpenDueDate}
      onOpenChange={(visible) => {
        setIsOpenDueDate(visible);
      }}
    >
      {type === DUEDATE_TYPES.FULL ? (
        <button className="modal__control-item">
          <CalendarOutlined style={{ color: showDueDate?.color }} />
          <p style={{ color: showDueDate?.color }}>{showDueDate?.text}</p>
          {showDueDate?.text !== "Due Date" && (
            <div onClick={handleCancelDueDate}>X</div>
          )}
        </button>
      ) : (
        <CalendarOutlined />
      )}
    </Popover>
  );
};
