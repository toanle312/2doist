import { Todo } from "@/Components/Todo/Todo";
import TodoList from "@/Components/TodoList/TodoList";
import TodoProvider from "@/Context/TodoContext";
import { TODO_PAGES } from "@/Utils";
import React from "react";

const TasksPage: React.FC = () => {
  return (
    <div className="control">
      <header className="today-header">
        <div className="today-header__content">
          <div>
            <span className="text-[20px] font-bold mr-2">Tasks</span>
          </div>
        </div>
      </header>
      <TodoProvider>
        <section className="todo-list hide-scrollbar">
          <div className="m-auto max-w-[800px] w-full">
            <TodoList />
          </div>
        </section>
        <section className="today-control">
          <div className="m-auto max-w-[800px] w-full">
            <Todo page={TODO_PAGES.TASKS} />
          </div>
        </section>
      </TodoProvider>
    </div>
  );
};

export default TasksPage;
