import { TagOutlined } from "@ant-design/icons";
import React, { useContext, useRef } from "react";
import "./TodoModal.scss";
import { Priority } from "./Priority/Priority";
import { DueDate } from "./DueDate/DueDate";
import { TodoContext } from "@/Context/TodoContext";
import { DUEDATE_TYPES, MODAL_TYPES } from "@/Utils";
import DueDateProvider from "@/Context/DueDateContext";
import { TTodo } from "@/interface";
import { useAppSelector } from "@/Hooks";
import { ThemeContext } from "@/Context/ThemeContext";
import Spinning from "@/Pages/LoadingPage/Spinning";
//

export type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
};

/**
 * @param setIsModalOpen function to handle open modal
 * @param type type of modal
 * @returns
 */
export const SubTaskModal: React.FC<Props> = ({ setIsModalOpen, type }) => {
  const {
    handleCancelTodo: handleCancelTask,
    handleChangeTodo: handleChangeTask,
    setTodo: setTask,
    handleAddSubTask,
    todo: task,
    handleUpdateSubTask,
    isLoadingUpdateTodo: isLoadingAddSubTask,
  } = useContext(TodoContext);

  const { isDarkTheme } = useContext(ThemeContext);

  const ref = useRef<TTodo>(task);

  const todo = useAppSelector((state) => state.todos.currentTodo);

  const handleCancelSubTask = () => {
    handleCancelTask();
    setTask(ref.current);
    setIsModalOpen(false);
  };
  const handleAddNewSubTask = () => {
    handleAddSubTask(todo, task);
    handleCancelTask();
  };

  const handleSaveSubTask = () => {
    handleUpdateSubTask(todo, task);
    setIsModalOpen(false);
  };

  return (
    <>
      {isLoadingAddSubTask ? (
        <div>
          <Spinning />
        </div>
      ) : (
        <div className={`modal ${isDarkTheme ? "dark-mode" : ""}`}>
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
            <button className={`modal__control-item`}>
              <TagOutlined />
              Label
            </button>
          </div>
          <hr />

          <div className={`modal__footer`}>
            <div></div>
            <div className="flex gap-2">
              <button
                className="bg-[#f5f5f5] text-black btn"
                onClick={handleCancelSubTask}
              >
                Cancel
              </button>
              {type === MODAL_TYPES.ADD ? (
                <button
                  className="!bg-primary !text-white btn"
                  disabled={task?.taskName === ""}
                  onClick={handleAddNewSubTask}
                >
                  Add sub-task
                </button>
              ) : (
                <button
                  className="!bg-primary !text-white btn"
                  disabled={task?.taskName === ""}
                  onClick={handleSaveSubTask}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
