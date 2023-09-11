import { Popover } from "antd";
import React from "react";
import "./DueDate.scss";
import { CalendarOutlined } from "@ant-design/icons";
import { DueDateItems } from "./DueDateItems";

export const DueDate = () => {
  
  return (
    <Popover
      placement="left"
      content={<DueDateItems/>}
      arrow={false}
      trigger="click"
    >
      <button className="modal__control-item">
        <CalendarOutlined />
        DueDate
      </button>
    </Popover>
  );
};
