import { Popover } from "antd";
import { useContext, useEffect, useRef } from "react";
import "./DueDate.scss";
import { CalendarOutlined } from "@ant-design/icons";
import { DueDateItems } from "./DueDateItems";
import { TodoContext } from "src/Context/TodoContext";

export const DueDate = () => {
  const {
    showDueDate,
    setDueDate,
    setShowDueDate,
    isOpenDueDate,
    setIsOpenDueDate,
  } = useContext(TodoContext);

  // Scroll into view current month after open DueDate
  useEffect(() => {
    const timerId = setTimeout(() => {
      document
        .getElementById("current-month-choose")
        ?.scrollIntoView({ block: "start", behavior: "instant" });
    });

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
    setDueDate("");
  };

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
        <CalendarOutlined style={{ color: showDueDate.color }} />
        <p style={{ color: showDueDate.color }}>{showDueDate.text}</p>
        {showDueDate.text !== "Due Date" && (
          <div onClick={handleCancelDueDate}>
            X
          </div>
        )}
      </button>
    </Popover>
  );
};
