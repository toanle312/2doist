import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useAppDispatch, useAppSelector } from "src/Hooks";
import { getTodos } from "src/Redux/Todos/TodosSlice";
import TodoProvider from "src/Context/TodoContext";

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
          return <TodoItem key={todo?.id} todo={todo} />;
        })}
    </ul>
  );
};

export default TodoList;
