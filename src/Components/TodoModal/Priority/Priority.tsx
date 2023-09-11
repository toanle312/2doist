import { CheckOutlined, FlagOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useMemo, useState } from "react";
import { priorities } from "src/assets";

import "./Priority.scss";

type Props = {
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
};

export const Priority: React.FC<Props> = ({ priority, setPriority }) => {
  const [icon, setIcon] = useState<JSX.Element>(<FlagOutlined />);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        {priority !== "Priority" && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setPriority("Priority");
              setIcon(<FlagOutlined />);
              setIsOpen(false);
            }}
          >
            X
          </div>
        )}
      </button>
    </Popover>
  );
};
