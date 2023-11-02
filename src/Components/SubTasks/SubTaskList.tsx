import React, { useEffect } from "react";
import TodoItem from "./SubTaskItem";
import { TODOITEM_TYPES } from "@/Utils";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { getTodos } from "@/Redux/Todos/TodosSlice";
import SubTaskItem from "./SubTaskItem";

const SubTaskList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const subTasks = useAppSelector((state) => state.subTasks.subTask.tasks);

  return (
    <ul>
      {subTasks
        // .filter((subtask) => !subtask.isCompleted)
        .map((subtask) => {
          return <SubTaskItem key={subtask.id} todo={subtask} />;
        })}
    </ul>
  );
};

export default SubTaskList;
