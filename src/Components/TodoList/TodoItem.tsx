import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { TTodo } from "@/interface";

import "./TodoItem.scss";
import {
  CheckOutlined,
  CommentOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { TodoModal } from "@/Components/TodoModal/TodoModal";
import { TodoContext } from "@/Context/TodoContext";
import {
  DUEDATE_TYPES,
  MODAL_TYPES,
  TODOITEM_TYPES,
  TODO_PAGES,
} from "@/Utils";
import { DueDate } from "@/Components/TodoModal/DueDate/DueDate";
import DueDateProvider from "@/Context/DueDateContext";
import EditTodoModal from "@/Components/EditTodoModal/EditTodoModal";

import ShowDueDate from "./ShowDueDate";
import { Dropdown } from "antd";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { deleteTodo } from "@/Redux/Todos/TodosSlice";
import { ViewContext } from "@/Context/ViewContext";
import Spinning from "@/Pages/LoadingPage/Spinning";

type Props = {
  todo: TTodo;
  type: string;
};

/**
 *
 * @param todo data of current todo
 * @param type type of todo item, type = FULL => todo item with full control, type = SHORT => simple todo item
 * @returns
 */
const TodoItem: React.FC<Props> = ({ todo, type }) => {
  const {
    setTodo,
    selectedItem,
    setSelectedItem,
    handleUpdateTodo,
    setIsShowAlert,
    isLoadingUpdateTodo,
  } = useContext(TodoContext);

  const { listView } = useContext(ViewContext);

  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  const [isLoadingToggle, setIsLoadingToggle] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isEditDueDate, setIsEditDueDate] = useState<boolean>(false);
  const [colorPriority, setColorPriority] = useState<string>("");
  const [isOpenEditTodoModal, setIsOpenEditTodoModal] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleToggle:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = async (e) => {
    e.stopPropagation();
    setTodo(todo);
    setIsLoadingToggle(true);
    await handleUpdateTodo({ ...todo, isCompleted: !todo.isCompleted });
    setIsLoadingToggle(false);
    setIsShowAlert(true);
  };

  const ref = useRef<HTMLElement>(null);

  const currentProject = useAppSelector(
    (state) => state.projects.currentProject
  );

  useEffect(() => {
    if (!isEditDueDate) {
      if (ref.current) {
        ref.current.style.display = "none";
      }
    }
  }, [isEditDueDate]);

  const items = useMemo(() => {
    return [
      {
        label: <p>Delete</p>,
        key: "0",
        onClick: async () => {
          try {
            setIsLoadingDelete(true);
            await dispatch(deleteTodo(todo)).unwrap();
            setIsLoadingDelete(false);
          } catch (error) {
            console.error(error);
            throw new Error("Can not delete todo");
          }
        },
      },
    ];
  }, []);

  useEffect(() => {
    setColorPriority(() => {
      if (todo.priority === 1) {
        return "red";
      }
      if (todo.priority === 2) {
        return "yellow";
      }
      if (todo.priority === 3) {
        return "blue";
      }
      return "";
    });
  }, [todo]);

  // show todo item with full version
  if (type === TODOITEM_TYPES.FULL) {
    return (
      <section>
        <Dropdown menu={{ items }} trigger={["contextMenu"]}>
          <section>
            {isLoadingToggle || isLoadingDelete ? (
              <li className="todo-item">
                <Spinning />
              </li>
            ) : (
              <li
                className={`todo-item ${listView === "List" ? "" : "board"} ${
                  todo.isCompleted ? "checked" : ""
                } relative cursor-pointer`}
                onClick={() => {
                  setTodo(todo);
                  setIsOpenEditTodoModal(true);
                  setSelectedItem(todo?.id as string);
                }}
              >
                {isEditTodo && todo?.id === selectedItem ? (
                  // show todo modal when click edit button
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <TodoModal
                      setIsModalOpen={setIsEditTodo}
                      type={MODAL_TYPES.SAVE}
                      page={
                        new Date(todo.dueDate) === new Date()
                          ? TODO_PAGES.TODAY
                          : TODO_PAGES.TASKS
                      }
                    />
                  </div>
                ) : (
                  // show todo item
                  <>
                    <section className="flex items-start py-1">
                      <button
                        className={`checkbox-btn ${colorPriority} mr-2 mt-[4px]`}
                        onClick={handleToggle}
                      >
                        <CheckOutlined className={`hidden check-icon`} />
                      </button>
                      <section className="w-full">
                        <section className="flex justify-between mb-2">
                          <p className="text-medium task-name">
                            {todo.taskName}
                          </p>
                          {listView === "Board" ? (
                            ""
                          ) : (
                            <section
                              className="control-list absolute right-0"
                              ref={ref}
                            >
                              <p
                                className="control-item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTodo(todo);
                                  setIsEditTodo(true);
                                  setSelectedItem(todo?.id as string);
                                }}
                              >
                                <EditOutlined />
                              </p>

                              <p
                                className="control-item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (ref.current) {
                                    ref.current.style.display = "flex";
                                    ref.current.style.gap = "8px";
                                  }
                                  setTodo(todo);
                                  setSelectedItem(todo?.id as string);
                                  setIsEditDueDate(true);
                                }}
                              >
                                <DueDateProvider>
                                  <DueDate
                                    type={DUEDATE_TYPES.SHORT}
                                    setIsEditDueDate={setIsEditDueDate}
                                  />
                                </DueDateProvider>
                              </p>
                              <p className="control-item">
                                <CommentOutlined />
                              </p>
                              {/* <p className="control-item">
                          <EllipsisOutlined />
                        </p> */}
                            </section>
                          )}
                        </section>
                        <p className="text-small text-textGray">
                          {todo.description}
                        </p>
                        <section className="flex mt-2 gap-1">
                          {todo.subTasks?.length ? (
                            <p className="text-small text-textGray">
                              Tasks &#x2022;
                              {` ${
                                todo.subTasks?.filter(
                                  (task) => task.isCompleted
                                ).length
                              }
                      of ${todo.subTasks?.length} `}
                              &#x2022;
                            </p>
                          ) : (
                            ""
                          )}
                          {listView === "Board" ? (
                            ""
                          ) : (
                            <DueDateProvider>
                              <ShowDueDate dueDate={todo.dueDate} />
                            </DueDateProvider>
                          )}
                        </section>
                        <p
                          className={`flex ${
                            listView === "List"
                              ? "justify-end"
                              : "justify-start"
                          } text-small`}
                        >
                          {currentProject === undefined
                            ? "Tasks"
                            : currentProject.projectName}
                        </p>
                      </section>
                    </section>
                    {listView === "Board" ? "" : <hr />}
                  </>
                )}
              </li>
            )}
          </section>
        </Dropdown>
        {/* Show edit todo modal when click item */}
        <EditTodoModal
          isOpenEditTodoModal={isOpenEditTodoModal}
          setIsOpenEditTodoModal={setIsOpenEditTodoModal}
        />
      </section>
    );
  }

  // show todo item shortened version
  if (type === TODOITEM_TYPES.SHORT) {
    return (
      <>
        {isLoadingToggle || isLoadingDelete ? (
          <li className="todo-item">
            <Spinning />
          </li>
        ) : (
          <li className={`todo-item ${todo.isCompleted ? "checked" : ""}`}>
            {isEditTodo ? (
              // show todo modal to edit task name and description when click task name or description
              <div
                className="flex"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {!isLoadingUpdateTodo ? (
                  <button
                    className={`checkbox-btn mr-2 mt-[8px]`}
                    onClick={handleToggle}
                  >
                    <CheckOutlined className={"hidden check-icon"} />
                  </button>
                ) : (
                  ""
                )}
                <TodoModal
                  isEditText
                  setIsModalOpen={setIsEditTodo}
                  type={MODAL_TYPES.SAVE}
                  page={
                    new Date(todo.dueDate) === new Date()
                      ? TODO_PAGES.TODAY
                      : TODO_PAGES.TASKS
                  }
                />
              </div>
            ) : (
              // show todo item for edit todo modal
              <>
                <section className="flex items-start">
                  <button
                    className="checkbox-btn mr-2 mt-[8px]"
                    onClick={handleToggle}
                  >
                    <CheckOutlined className={"hidden check-icon"} />
                  </button>
                  <section className="w-full p-[6.5px] flex flex-col gap-[4px]">
                    <p
                      className="task-name text-small font-[500] cursor-text"
                      onClick={() => {
                        setIsEditTodo(true);
                        setTodo(todo);
                      }}
                    >
                      {todo.taskName}
                    </p>
                    <p
                      className="text-small text-textGray cursor-text"
                      onClick={() => {
                        setIsEditTodo(true);
                        setTodo(todo);
                      }}
                    >
                      {todo.description}
                    </p>
                  </section>
                </section>
              </>
            )}
          </li>
        )}
      </>
    );
  }
};

export default TodoItem;
