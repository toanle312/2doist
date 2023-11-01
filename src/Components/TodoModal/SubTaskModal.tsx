import { TagOutlined } from "@ant-design/icons";
import React, { useContext, useRef } from "react";
import "./TodoModal.scss";
import { Priority } from "./Priority/Priority";
import { DueDate } from "./DueDate/DueDate";
import { TodoContext } from "@/Context/TodoContext";
import { DUEDATE_TYPES } from "@/Utils";
import DueDateProvider from "@/Context/DueDateContext";
import { TSubTask, TTodo } from "@/interface";
//

export type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subTask: TSubTask;
};

export const SubTaskModal: React.FC<Props> = ({ setIsModalOpen, subTask }) => {
  const {
    handleCancelTodo,
    handleChangeTodo,
    handleUpdateSubTask: handleAddSubTask,
    setTodo,
    todo,
  } = useContext(TodoContext);

  const ref = useRef<TTodo>(todo);

  return (
    <div className="modal">
      <input
        className="modal__input font-medium"
        placeholder="Task name"
        name="taskName"
        value={todo?.taskName}
        onChange={(e) => {
          handleChangeTodo(e.target.name, e.target.value);
        }}
      />
      <input
        className="modal__input"
        placeholder="Description"
        name="description"
        value={todo?.description}
        onChange={(e) => {
          handleChangeTodo(e.target.name, e.target.value);
        }}
      />

      <div className="modal__control">
        <DueDateProvider>
          <DueDate type={DUEDATE_TYPES.FULL} />
        </DueDateProvider>
        <Priority />
        <button className="modal__control-item">
          <TagOutlined />
          Label
        </button>
      </div>
      <hr />

      <div className="modal__footer">
        <div>Choose here</div>
        <div className="flex gap-2">
          <button
            className="bg-[#f5f5f5] text-black btn"
            onClick={() => {
              handleCancelTodo();
              setTodo(ref.current);
              setIsModalOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-primary text-white btn"
            disabled={todo?.taskName === ""}
            onClick={() => {
              handleAddSubTask(subTask);
              handleCancelTodo();
            }}
          >
            Add sub-task
          </button>
        </div>
      </div>
    </div>
  );
};
