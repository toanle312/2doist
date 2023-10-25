import { Checkbox, Modal, Radio } from "antd";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { TTodo } from "src/interface";

import "./TodoItem.scss";
import {
  CalendarOutlined,
  CheckOutlined,
  CommentOutlined,
  EditOutlined,
  EllipsisOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "src/Hooks";
import { updateTodo } from "src/Redux/Todos/TodosSlice";
import { TodoModal } from "../TodoModal/TodoModal";
import { TodoContext } from "src/Context/TodoContext";
import { DUEDATE_TYPES, MODAL_TYPES, TODO_PAGES } from "src/Utils";
import { DueDate } from "../TodoModal/DueDate/DueDate";
import DueDateProvider from "src/Context/DueDateContext";
import { DueDateItems } from "../TodoModal/DueDate/DueDateItems";
import EditTodoModal from "../EditTodoModal/EditTodoModal";

type Props = {
  todo: TTodo;
  type: string;
};

const TodoItem: React.FC<Props> = ({ todo, type }) => {
  const { setTodo, selectedItem, setSelectedItem, handleUpdateTodo } =
    useContext(TodoContext);

  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  const [isEditDueDate, setIsEditDueDate] = useState<boolean>(false);
  const [isOpenEditTodoModal, setIsOpenEditTodoModal] =
    useState<boolean>(false);

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.stopPropagation();
    handleUpdateTodo({ ...todo, isCompleted: true });
  };

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isEditDueDate) {
      if (ref.current) {
        ref.current.style.display = "none";
      }
    }
  }, [isEditDueDate]);

  return (
    <>
      {type === "FULL" ? (
        <>
          <li
            className="todo-item relative"
            onClick={() => {
              setTodo(todo)
              setIsOpenEditTodoModal(true);
            }}
          >
            {isEditTodo && todo?.id === selectedItem ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <TodoModal
                  isEditText={type === "FULL" ? false : true}
                  setIsModalOpen={setIsEditTodo}
                  type={MODAL_TYPES.SAVE}
                  page={
                    new Date(todo.dueDate) === new Date()
                      ? TODO_PAGES.TODAY
                      : TODO_PAGES.INBOX
                  }
                />
              </div>
            ) : (
              <>
                <section className="flex items-start py-1">
                  <button
                    className="checkbox-btn mr-2 mt-[4px]"
                    onClick={handleToggle}
                  >
                    <CheckOutlined className={"hidden check-icon"} />
                  </button>
                  <section className="w-full">
                    <section className="flex justify-between mb-2">
                      <p className="text-medium">{todo.taskName}</p>
                      <section
                        className="control-list absolute right-[-42px]"
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
                        <p className="control-item">
                          <EllipsisOutlined />
                        </p>
                      </section>
                    </section>
                    <p className="text-small text-textGray">
                      {todo.description}
                    </p>
                    <p className="flex justify-end text-small">Inbox</p>
                  </section>
                </section>
                <hr />
              </>
            )}
          </li>
          <EditTodoModal
            isOpenEditTodoModal={isOpenEditTodoModal}
            setIsOpenEditTodoModal={setIsOpenEditTodoModal}
            todo={todo}
          />
        </>
      ) : (
        <li className="todo-item relative">
          {isEditTodo ? (
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
                    : TODO_PAGES.INBOX
                }
              />
            </div>
          ) : (
            <>
              <section className="flex items-start py-1">
                <button
                  className="checkbox-btn mr-2 mt-[4px]"
                  onClick={handleToggle}
                >
                  <CheckOutlined className={"hidden check-icon"} />
                </button>
                <section className="w-full">
                  <p
                    className="text-medium cursor-text"
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
              <hr />
            </>
          )}
        </li>
      )}
    </>
  );
};

export default TodoItem;
