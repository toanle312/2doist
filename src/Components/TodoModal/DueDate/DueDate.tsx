import { Popover } from "antd";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./DueDate.scss";
import { CalendarOutlined } from "@ant-design/icons";
import { DueDateItems } from "./DueDateItems";
import { TodoContext } from "src/Context/TodoContext";
import { TODO_PROPERTIES } from "src/Utils";
import { DaysInWeek, TShowDueDate } from "src/interface";
import { DueDateContext } from "src/Context/DueDateContext";

type Props = {
  initDate?: string;
  handleChangeEditTodo?: (name: string, value: any) => void;
};

export const DueDate: React.FC<Props> = () => {
  const { todo, handleChangeTodo } = useContext(TodoContext);

  const {
    isOpenDueDate,
    setIsOpenDueDate,
    showDueDate,
    setShowDueDate,
    dateList,
  } = useContext(DueDateContext);

  // Scroll into view current month after open DueDate
  useEffect(() => {
    let timerId: any = undefined;
    if (isOpenDueDate) {
      timerId = setTimeout(() => {
        document
          .getElementById("current-month-choose")
          ?.scrollIntoView({ block: "start", behavior: "instant" });
      });
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
    setShowDueDate({
      color: "",
      text: "Due Date",
    });
    handleChangeTodo(TODO_PROPERTIES.DUE_DATE, "");
  };

  useEffect(() => {
    const findDate = dateList.find(
      (dateItem) => dateItem.date === todo.dueDate
    );
    if (findDate) {
      handleChangeTodo(TODO_PROPERTIES.DUE_DATE, findDate.date);
      setShowDueDate({
        color: findDate.color,
        text: findDate.content === "No Date" ? "Due Date" : findDate.content,
      });
    } else {
      handleChangeTodo(TODO_PROPERTIES.DUE_DATE, todo.dueDate);
      setShowDueDate({
        color: "#692ec2",
        text: DaysInWeek[new Date(todo.dueDate).getDay()],
      });
    }
  }, [todo.dueDate, dateList]);

  return (
    <Popover
      placement="leftBottom"
      content={<DueDateItems />}
      arrow={false}
      trigger="click"
      open={isOpenDueDate}
      onOpenChange={(visible) => {
        setIsOpenDueDate(visible);
      }}
    >
      <button className="modal__control-item">
        <CalendarOutlined style={{ color: showDueDate?.color }} />
        <p style={{ color: showDueDate?.color }}>{showDueDate?.text}</p>
        {showDueDate?.text !== "Due Date" && (
          <div onClick={handleCancelDueDate}>X</div>
        )}
      </button>
    </Popover>
  );
};
