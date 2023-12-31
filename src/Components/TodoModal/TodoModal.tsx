/* eslint-disable react-hooks/exhaustive-deps */
import { TagOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./TodoModal.scss";
import { Priority } from "./Priority/Priority";
import { DueDate } from "./DueDate/DueDate";
import { TodoContext } from "@/Context/TodoContext";
import {
  DUEDATE_TYPES,
  MODAL_TYPES,
  TODO_PAGES,
  TODO_PROPERTIES,
} from "@/Utils";
import DueDateProvider from "@/Context/DueDateContext";
import { TTodo } from "@/interface";
import { useAppSelector } from "@/Hooks";
import { Select } from "antd";
import { ThemeContext } from "@/Context/ThemeContext";
import Spinning from "@/Pages/LoadingPage/Spinning";

export type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  page?: string;
  type?: string;
  isEditText?: boolean;
  currentDate?: Date;
};

/**
 * @param setIsModalOpen function to handle open modal
 * @param page type of todo page
 * @param type type of modal
 * @param isEditText (optional) true: modal is edit text only (default), false: modal is normal
 * @returns
 */
export const TodoModal: React.FC<Props> = ({
  setIsModalOpen,
  page,
  type,
  isEditText = false,
  currentDate,
}) => {
  const {
    handleCancelTodo,
    handleAddTodo,
    handleChangeTodo,
    handleUpdateTodo,
    isLoadingUpdateTodo,
    setTodo,
    todo,
  } = useContext(TodoContext);

  const prevTodoRef = useRef<TTodo>(todo);

  const projects = useAppSelector((state) => state.projects.projects);
  const currentProject = useAppSelector(
    (state) => state.projects.currentProject
  );

  const [isLoadingAddNewTodo, setIsLoadingAddNewTodo] =
    useState<boolean>(false);

  useEffect(() => {
    if (page === TODO_PAGES.TODAY) {
      handleChangeTodo(TODO_PROPERTIES.DUE_DATE, new Date().toDateString());
    } else if (page === TODO_PAGES.PROJECT) {
      handleChangeTodo(TODO_PROPERTIES.PROJECT, currentProject?.id);
    } else if (currentDate) {
      handleChangeTodo(TODO_PROPERTIES.DUE_DATE, currentDate.toDateString());
    }
  }, []);

  const handleAddNewTodo = async () => {
    setIsLoadingAddNewTodo(true);
    await handleAddTodo();

    handleChangeTodo(
      TODO_PROPERTIES.PROJECT,
      page === TODO_PAGES.PROJECT
        ? currentProject?.id
        : prevTodoRef.current.project
    );

    handleCancelTodo(page);

    setIsLoadingAddNewTodo(false);
  };

  const handleCancelAddTodo = () => {
    if (type === MODAL_TYPES.ADD) {
      handleCancelTodo();
    }

    setTodo(prevTodoRef.current);
    setIsModalOpen(false);
  };

  const handleSaveTodo = async () => {
    await handleUpdateTodo(todo);
    setIsModalOpen(false);
  };

  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <>
      {isLoadingAddNewTodo || isLoadingUpdateTodo ? (
        <Spinning />
      ) : (
        <div className={`modal ${isDarkTheme ? "dark-mode" : ""}`}>
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
          {!isEditText && (
            <div>
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
            </div>
          )}
          <div className="modal__footer">
            {!isEditText ? (
              <div>
                <Select
                  style={{
                    width: "150px",
                    backgroundColor: "transparent",
                    borderColor: "none",
                  }}
                  onChange={(value) => {
                    handleChangeTodo(TODO_PROPERTIES.PROJECT, value);
                  }}
                  onSelect={(value) => {
                    handleChangeTodo(TODO_PROPERTIES.PROJECT, value);
                  }}
                  value={todo?.project}
                  options={[
                    {
                      value: "Tasks",
                      label: "Tasks",
                    },
                    {
                      label: "Projects",
                      options: [
                        ...projects.map((project) => ({
                          value: project.id,
                          label: project.projectName,
                        })),
                      ],
                    },
                  ]}
                />
              </div>
            ) : (
              ""
            )}
            <div className="ml-auto flex gap-2">
              <button className="btn" onClick={handleCancelAddTodo}>
                Cancel
              </button>
              {(type === MODAL_TYPES.ADD && (
                <button
                  className="!bg-primary !text-white btn"
                  disabled={todo?.taskName === ""}
                  onClick={handleAddNewTodo}
                >
                  Add task
                </button>
              )) ||
                (type === MODAL_TYPES.SAVE && !isEditText && (
                  <button
                    className="!bg-primary !text-white btn"
                    disabled={todo?.taskName === ""}
                    onClick={handleSaveTodo}
                  >
                    Save
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
