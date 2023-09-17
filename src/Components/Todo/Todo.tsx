import {
  CalendarOutlined,
  FlagFilled,
  FlagOutlined,
  PlusOutlined,
  TagOutlined,
} from "@ant-design/icons";
import React, { useMemo, useState, useContext, useEffect } from "react";
import "./Todo.scss";
import { Popover } from "antd";
import { priorities } from "src/assets";
import { TodoModal } from "../TodoModal/TodoModal";
import { TodoContext } from "src/Context/TodoContext";

type Props = {
  type: string;
}

export const Todo: React.FC<Props> = ({type}) => {
  const [addTodo, setAddTodo] = useState<boolean>(false);
  const {setDueDate, setShowDueDate} = useContext(TodoContext)

  useEffect(() => {
    if(type === "Today"){
      setDueDate(new Date().toDateString());
      setShowDueDate({
        text: "Today",
        color: "#4b9244"
      }); //
    }
  }, [])


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
