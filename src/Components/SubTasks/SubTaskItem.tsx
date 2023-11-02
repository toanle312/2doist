import React, { useContext, useEffect, useRef, useState } from "react";
import { TTodo } from "@/interface";

import "./SubTaskItem.scss";
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
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { getSubTasks } from "@/Redux/SubTasks/SubTasksSlice";
import { SubTaskModal } from "../TodoModal/SubTaskModal";

type Props = {
  todo: TTodo;
};

/**
 * @param Props todo
 * @returns JSX.Element
 */
const SubTaskItem: React.FC<Props> = ({ todo }) => {
  const { setTodo, selectedItem, setSelectedItem, handleUpdateTaskInSubTask } =
    useContext(TodoContext);

  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  const [isEditDueDate, setIsEditDueDate] = useState<boolean>(false);

  const currentSubTask = useAppSelector((state) => state.subTasks.subTask);

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.stopPropagation();
    handleUpdateTaskInSubTask(currentSubTask, {
      ...todo,
      isCompleted: !todo.isCompleted,
    });
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
    <li
      className={`subtask-item relative ${
        todo.isCompleted ? "checked" : "cursor-pointer"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        if (!todo.isCompleted) {
          setTodo(todo);
          setIsEditTodo(true);
          setSelectedItem(todo?.id as string);
        }
      }}
    >
      {isEditTodo && todo?.id === selectedItem ? (
        // show todo modal when click edit button
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SubTaskModal
            setIsModalOpen={setIsEditTodo}
            type={MODAL_TYPES.SAVE}
            subTask={currentSubTask}
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
              <p className="text-medium task-name">{todo.taskName}</p>
              <p className="text-small text-textGray">{todo.description}</p>
              <p className="flex justify-end text-small">Inbox</p>
            </section>
          </section>
          <hr />
        </>
      )}
    </li>
  );
};

export default SubTaskItem;
