import { CheckOutlined, FlagOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { priorities } from "src/assets";

import "./Priority.scss";
import { TodoContext } from "src/Context/TodoContext";

export const Priority: React.FC = () => {
  const [icon, setIcon] = useState<JSX.Element>(<FlagOutlined />);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { priority, setPriority } = useContext(TodoContext);

  const priorityItem = useMemo(() => {
    return priorities.map((p) => (
      <div
        key={p.id}
        className="flex items-center gap-2 priority"
        onClick={() => {
          setPriority(p.id);
          setIcon(p.icon);
          setIsOpen(false);
        }}
      >
        {p.icon}
        {p.name}
        {priority === p.id && <CheckOutlined />}
      </div>
    ));
  }, [priority, setPriority]);

  const handleCancelPriority = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setPriority("Priority");
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
        {icon}
        {priority}
        {priority !== "Priority" && <div onClick={handleCancelPriority}>X</div>}
      </button>
    </Popover>
  );
};
