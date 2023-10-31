import {
  PlusOutlined
} from "@ant-design/icons";
import React, { useContext, useState } from "react";
import "./Todo.scss";
import { TodoModal } from "@/Components/TodoModal/TodoModal";
import { MODAL_TYPES, TODO_PAGES } from "@/Utils";
import { TodoContext } from "@/Context/TodoContext";

export const Todo: React.FC = () => {
  const [isAddTodo, setIsAddTodo] = useState<boolean>(false);

  const {selectedItem, setSelectedItem, handleCancelTodo : resetTodo} = useContext(TodoContext);

  return (
    <div className="mt-[24px]">
      {!isAddTodo || selectedItem !== "nothing" ? (
        <div
          className="flex items-center gap-2 text-textGray todo text-medium"
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
