import React, { useContext, useState } from "react";
import { TTodo } from "@/interface";

import "./SubTaskItem.scss";
import { CheckOutlined } from "@ant-design/icons";
import { TodoContext as SubTaskContext } from "@/Context/TodoContext";
import { MODAL_TYPES } from "@/Utils";

import { useAppSelector } from "@/Hooks";
import { SubTaskModal } from "../TodoModal/SubTaskModal";

type Props = {
  task: TTodo;
};

/**
 * @param Props task
 * @returns JSX.Element
 */
const SubTaskItem: React.FC<Props> = ({ task }) => {
  const {
    setTodo: setTask,
    selectedItem,
    setSelectedItem,
    handleUpdateSubTask,
  } = useContext(SubTaskContext);

  const [isEditTask, setIsEditTask] = useState<boolean>(false);

  const currentTodo = useAppSelector((state) => state.todos.currentTodo);

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.stopPropagation();
    handleUpdateSubTask(currentTodo, {
      ...task,
      isCompleted: !task.isCompleted,
    });
  };

  return (
    <li
      className={`subtask-item relative ${
        task.isCompleted ? "checked" : "cursor-pointer"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        if (!task.isCompleted) {
          setTask(task);
          setIsEditTask(true);
          setSelectedItem(task?.id as string);
        }
      }}
    >
      {isEditTask && task?.id === selectedItem ? (
        // show todo modal when click edit button
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SubTaskModal
            setIsModalOpen={setIsEditTask}
            type={MODAL_TYPES.SAVE}
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
              <p className="text-small font-[500] task-name">{task.taskName}</p>
              <p className="text-small text-textGray">{task.description}</p>
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
