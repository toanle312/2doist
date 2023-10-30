import {
  PlusOutlined
} from "@ant-design/icons";
import React, { useContext, useState } from "react";
import "./Todo.scss";
import { TodoModal } from "../TodoModal/TodoModal";
import { MODAL_TYPES, TODO_PAGES } from "src/Utils";
import { TodoContext } from "src/Context/TodoContext";
import { TTodo } from "src/interface";

export const Todo: React.FC = () => {
  const [isAddTodo, setIsAddTodo] = useState<boolean>(false);

  const {selectedItem, setSelectedItem, handleCancelTodo : resetTodo} = useContext(TodoContext);

  return (
    <div className="mt-[24px]">
      {!isAddTodo || selectedItem !== "nothing" ? (
        <div
          className="flex items-center gap-2 text-textGray todo"
          onClick={() => {
            setIsAddTodo(true);
            setSelectedItem("nothing");
            resetTodo("Today");
          }}
        >
          <PlusOutlined className="icon" />
          <p>Add task</p>
        </div>
      ) : (
        <TodoModal type={MODAL_TYPES.ADD} page={TODO_PAGES.TODAY} setIsModalOpen={setIsAddTodo} isEditText={false}/>
      )}
    </div>
  );
};
