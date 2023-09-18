import { Popover } from "antd";
import React, { useContext, useState } from "react";
import "./DueDate.scss";
import { CalendarOutlined } from "@ant-design/icons";
import { DueDateItems } from "./DueDateItems";
import { TodoContext } from "src/Context/TodoContext";

export const DueDate = () => {
  const { showDueDate, setDueDate, setShowDueDate, isOpenDueDate, setIsOpenDueDate } = useContext(TodoContext);
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
      <button
        className="modal__control-item"
      >
        <CalendarOutlined style={{ color: showDueDate.color }} />
        <p style={{ color: showDueDate.color }}>{showDueDate.text}</p>
        {showDueDate.text !== "Due Date" && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowDueDate({
                color: "",
                text: "Due Date",
              });
              setDueDate("");
            }}
          >
            X
          </div>
        )}
      </button>
    </Popover>
  );
};