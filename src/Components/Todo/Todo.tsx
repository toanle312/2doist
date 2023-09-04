import {
  CalendarOutlined,
  FlagFilled,
  FlagOutlined,
  PlusOutlined,
  TagOutlined,
} from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import "./Todo.scss";
import { Popover } from "antd";
import { priorities } from "src/assets";
import { TodoModal } from "../TodoModal/TodoModal";

export const Todo: React.FC = () => {
  const [addTodo, setAddTodo] = useState<boolean>(false);

  return (
    <div>
      {!addTodo ? (
        <div
          className="flex items-center gap-2 text-textGray todo"
          onClick={() => {
            setAddTodo(true);
          }}
        >
          <PlusOutlined className="icon" />
          <p>Add task</p>
        </div>
      ) : (
        <TodoModal setAddTodo={setAddTodo}/>
      )}
    </div>
  );
};
