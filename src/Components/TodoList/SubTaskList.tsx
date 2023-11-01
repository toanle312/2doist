import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { TODOITEM_TYPES } from "@/Utils";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { getTodos } from "@/Redux/Todos/TodosSlice";

const SubTaskList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const subTasks = useAppSelector((state) => state.subTasks.subTask.tasks);

  return (
    <ul>
      {subTasks
        .filter((subtask) => !subtask.isCompleted)
        .map((subtask) => {
          return (
            <TodoItem
              key={subtask.id}
              todo={subtask}
              type={TODOITEM_TYPES.SHORT}
            />
          );
        })}
    </ul>
  );
};

export default SubTaskList;
