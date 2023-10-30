import { CheckOutlined, FlagOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { priorities } from "src/assets";

import "./Priority.scss";
import { TodoContext } from "src/Context/TodoContext";
import { TODO_PROPERTIES } from "src/Utils";
import { EPriority } from "src/interface";

export const Priority: React.FC = () => {
  const { todo, handleChangeTodo } = useContext(TodoContext);

  const [icon, setIcon] = useState<JSX.Element>(<FlagOutlined />);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const initPriority = priorities.find((p) => p.number === todo.priority);
    setIcon(initPriority?.icon as JSX.Element);
  }, [todo.priority]);

  const priorityItem = useMemo(() => {
    return priorities.map((p) => (
      <div
        key={p.id}
        className="flex items-center gap-2 priority"
        onClick={() => {
          handleChangeTodo(TODO_PROPERTIES.PRIORITY, p.number);
          setIcon(p.icon);
          setIsOpen(false);
        }}
      >
        {p.icon}
        {p.name}
        {todo?.priority === p.number && <CheckOutlined />}
      </div>
    ));
  }, [handleChangeTodo, todo?.priority]);

  const handleCancelPriority = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleChangeTodo(TODO_PROPERTIES.PRIORITY, 4);
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
        {todo?.priority === 4 ? <FlagOutlined /> : icon}
        {EPriority[todo?.priority]}
        {todo?.priority !== 4 && <div onClick={handleCancelPriority}>X</div>}
      </button>
    </Popover>
  );
};
