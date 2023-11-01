import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useAppDispatch } from "@/Hooks";
import { getSubTasks } from "@/Redux/SubTasks/SubTasksSlice";

type Props = {
  todo: TTodo;
  type: string;
};

/**
 * if type = FULL => return todo item with full control
 *
 * if type = SHORT => return simple todo item
 * @param Props todo, type
 * @returns JSX.Element
 */
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

  const dispatch = useAppDispatch();

  return (
    <>
      {type === TODOITEM_TYPES.FULL && (
        // Item with full control -> use for todo list
        <section>
          <li
            className="todo-item relative cursor-pointer"
            onClick={() => {
              setTodo(todo);
              setIsOpenEditTodoModal(true);
              setSelectedItem(todo?.id as string);
              dispatch(getSubTasks(todo?.id as string));
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
                  isEditText={false}
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
              // show todo item
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
          {/* Show edit todo modal when click item */}
          <EditTodoModal
            isOpenEditTodoModal={isOpenEditTodoModal}
            setIsOpenEditTodoModal={setIsOpenEditTodoModal}
            currentTodo={todo}
          />
        </section>
      )}
      {type === TODOITEM_TYPES.SHORT && (
        // Item without control -> use for edit todo modal
        <li className="todo-item">
          {isEditTodo ? (
            // show todo modal to edit task name and description when click task name or description
            <div
              className="flex"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                className="checkbox-btn mr-2 mt-[8px]"
                onClick={handleToggle}
                disabled
              >
                <CheckOutlined className={"hidden check-icon"} />
              </button>
              <TodoModal
                isEditText={true}
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
                    className="text-small font-[500] cursor-text"
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
};

export default TodoItem;
