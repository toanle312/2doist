import {
  PlusOutlined
} from "@ant-design/icons";
import React, { useContext, useState } from "react";
import "./Todo.scss";
import { TodoModal } from "../TodoModal/TodoModal";
import { TODO_TYPES } from "src/Utils";
import { TodoContext } from "src/Context/TodoContext";
import { TTodo } from "src/interface";

export const Todo: React.FC = () => {
  const [addTodo, setAddTodo] = useState<boolean>(false);

  const {selectedItem, setSelectedItem, handleCancelTodo : resetTodo} = useContext(TodoContext);

  return (
    <div className="mt-[24px]">
      {!addTodo || selectedItem !== "nothing" ? (
        <div
          className="flex items-center gap-2 text-textGray todo"
          onClick={() => {
            setAddTodo(true);
            setSelectedItem("nothing");
            resetTodo("Today");
          }}
        >
          <PlusOutlined className="icon" />
          <p>Add task</p>
        </div>
      ) : (
        <TodoModal type={TODO_TYPES.TODAY} setAddTodo={setAddTodo}/>
      )}
    </div>
  );
};
