import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useAppDispatch, useAppSelector } from "src/Hooks";
import { getTodos } from "src/Redux/Todos/TodosSlice";

const TodoList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const todos = useAppSelector(state => state.todos.todos);

  return (
    <ul>
      {todos.map((todo) => {
        console.log(todo)
        return <TodoItem key={todo?.id} todo={todo}/>;
      })}
    </ul>
  );
};

export default TodoList;
