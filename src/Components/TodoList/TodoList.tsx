import { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { getTodos } from "@/Redux/Todos/TodosSlice";
import { TODOITEM_TYPES } from "@/Utils";

const TodoList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <ul>
      {todos
        .filter((todo) => !todo.isCompleted)
        .map((todo) => {
          return (
            <TodoItem key={todo?.id} todo={todo} type={TODOITEM_TYPES.FULL} />
          );
        })}
    </ul>
  );
};

export default TodoList;
