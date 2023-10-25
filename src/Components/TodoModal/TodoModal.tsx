import { TagOutlined } from "@ant-design/icons";
import React, { useContext, useEffect } from "react";
import "./TodoModal.scss";
import { Priority } from "./Priority/Priority";
import { DueDate } from "./DueDate/DueDate";
import { TodoContext } from "src/Context/TodoContext";
import { DUEDATE_TYPES, MODAL_TYPES, TODO_PAGES } from "src/Utils";
import DueDateProvider from "src/Context/DueDateContext";

export type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  page?: string;
  type?: string;
  isEditText?: boolean;
};

export const TodoModal: React.FC<Props> = ({
  setIsModalOpen,
  page,
  type,
  isEditText,
}) => {
  const {
    handleCancelTodo,
    handleAddTodo,
    handleChangeTodo,
    handleUpdateTodo,
    todo,
  } = useContext(TodoContext);

  useEffect(() => {
    if (page === TODO_PAGES.TODAY) {
      handleChangeTodo("dueDate", new Date().toDateString());
    }
  }, []);

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
      {isEditText === false && (
        <>
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
        </>
      )}
      <div className="modal__footer">
        <div>{isEditText === false ? "Choose here" : ""}</div>
        <div className="flex gap-2">
          <button
            className="bg-[#f5f5f5] text-black btn"
            onClick={() => {
              handleCancelTodo();
              setIsModalOpen(false);
            }}
          >
            Cancel
          </button>
          {type === MODAL_TYPES.ADD ? (
            <button
              className="bg-primary text-white btn"
              disabled={todo?.taskName === ""}
              onClick={() => {
                handleAddTodo();
                handleCancelTodo(page);
              }}
            >
              Add task
            </button>
          ) : (
            <button
              className="bg-primary text-white btn"
              disabled={todo?.taskName === ""}
              onClick={() => {
                handleUpdateTodo(todo);
                handleCancelTodo(page);
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
