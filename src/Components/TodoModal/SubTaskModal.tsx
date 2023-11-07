import { TagOutlined } from "@ant-design/icons";
import React, { useContext, useRef } from "react";
import "./TodoModal.scss";
import { Priority } from "./Priority/Priority";
import { DueDate } from "./DueDate/DueDate";
import { TodoContext } from "@/Context/TodoContext";
import { DUEDATE_TYPES, MODAL_TYPES } from "@/Utils";
import DueDateProvider from "@/Context/DueDateContext";
import { TSubTask, TTodo } from "@/interface";
import { useAppSelector } from "@/Hooks";
//

export type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
};

export const SubTaskModal: React.FC<Props> = ({ setIsModalOpen, type }) => {
  const {
    handleCancelTodo: handleCancelTask,
    handleChangeTodo: handleChangeTask,
    setTodo: setTask,
    handleAddSubTask,
    todo: task,
    handleUpdateSubTask,
  } = useContext(TodoContext);

  const ref = useRef<TTodo>(task);

  const todo = useAppSelector((state) => state.todos.currentTodo);

  return (
    <div className="modal">
      <input
        className="modal__input font-medium"
        placeholder="Task name"
        name="taskName"
        value={task?.taskName}
        onChange={(e) => {
          handleChangeTask(e.target.name, e.target.value);
        }}
      />
      <input
        className="modal__input"
        placeholder="Description"
        name="description"
        value={task?.description}
        onChange={(e) => {
          handleChangeTask(e.target.name, e.target.value);
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
              handleCancelTask();
              setTask(ref.current);
              setIsModalOpen(false);
            }}
          >
            Cancel
          </button>
          {type === MODAL_TYPES.ADD ? (
            <button
              className="bg-primary text-white btn"
              disabled={task?.taskName === ""}
              onClick={() => {
                handleAddSubTask(todo, task);
                handleCancelTask();
              }}
            >
              Add sub-task
            </button>
          ) : (
            <button
              className="bg-primary text-white btn"
              disabled={task?.taskName === ""}
              onClick={() => {
                // Updated task with current task state
                // handleUpdateTaskInSubTask(subTask as TSubTask, task);
                handleUpdateSubTask(todo, task);
                setIsModalOpen(false);
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
