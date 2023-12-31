import ControlHeader from "@/Components/ControlHeader/ControlHeader";
import { Todo } from "@/Components/Todo/Todo";
import TodoList from "@/Components/TodoList/TodoList";
import TodoProvider from "@/Context/TodoContext";
import ViewProvider from "@/Context/ViewContext";
import { TODO_PAGES } from "@/Utils";
import React from "react";

const TasksPage: React.FC = () => {
  return (
    <ViewProvider>
      <div className="control">
        <header className="page-header">
          <ControlHeader page={TODO_PAGES.TASKS} />
        </header>
        <TodoProvider>
          <section className="todo-list hide-scrollbar">
            <div
              id="custom-scrollbar"
              className="m-auto max-w-[800px] w-full overflow-x-auto"
            >
              <TodoList page={TODO_PAGES.TASKS} />
            </div>
          </section>
          <section className="page-control">
            <div className="m-auto max-w-[800px] w-full">
              <Todo page={TODO_PAGES.TASKS} />
            </div>
          </section>
        </TodoProvider>
      </div>
    </ViewProvider>
  );
};

export default TasksPage;
