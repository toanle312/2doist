import { CheckOutlined, FlagOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { priorities } from "src/assets";

import "./Priority.scss";
import { TodoContext } from "src/Context/TodoContext";
import { TODO_PROPERTIES } from "src/Utils";

export const Priority: React.FC = () => {
  const [icon, setIcon] = useState<JSX.Element>(<FlagOutlined />);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { todo, handleChangeTodo } = useContext(TodoContext);

  const priorityItem = useMemo(() => {
    return priorities.map((p) => (
      <div
        key={p.id}
        className="flex items-center gap-2 priority"
        onClick={() => {
          handleChangeTodo(TODO_PROPERTIES.PRIORITY, p.id);
          setIcon(p.icon);
          setIsOpen(false);
        }}
      >
        {p.icon}
        {p.name}
        {todo.priority === p.id && <CheckOutlined />}
      </div>
    ));
  }, [handleChangeTodo, todo.priority]);

  const handleCancelPriority = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleChangeTodo(TODO_PROPERTIES.PRIORITY, "Priority");
    setIcon(<FlagOutlined />);
    setIsOpen(false);
  };

  return (
    <Popover
      content={priorityItem}
      trigger="click"
      arrow={false}
      placement="bottom"
      open={isOpen}
      onOpenChange={(visible) => {
        setIsOpen(visible);
      }}
    >
      <button className="modal__control-item">
        {todo.priority === "Priority" ? <FlagOutlined /> : icon}
        {todo.priority}
        {todo.priority !== "Priority" && (
          <div onClick={handleCancelPriority}>X</div>
        )}
      </button>
    </Popover>
  );
};
