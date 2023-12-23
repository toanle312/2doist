import React, { useEffect } from "react";
import "./style.scss";
import { Todo } from "@/Components/Todo/Todo";
import TodoProvider from "@/Context/TodoContext";
import TodoList from "@/Components/TodoList/TodoList";
import { TODO_PAGES } from "@/Utils";
import ViewProvider from "@/Context/ViewContext";
import ControlHeader from "@/Components/ControlHeader/ControlHeader";
import { projectsSlice } from "@/Redux/Projects/ProjectsSlice";
import { useAppDispatch } from "@/Hooks";

const TodayPage: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(projectsSlice.actions.getProject("Tasks"));
  }, []);
  return (
    <ViewProvider>
      <div className="control">
        <header className="today-header">
          <ControlHeader />
        </header>
        <TodoProvider>
          <section className="todo-list hide-scrollbar">
            <div className="m-auto max-w-[800px] w-full">
              <TodoList type="Today" />
            </div>
          </section>
          <section className="today-control">
            <div className="m-auto max-w-[800px] w-full">
              <Todo page={TODO_PAGES.TODAY} />
            </div>
          </section>
        </TodoProvider>
      </div>
    </ViewProvider>
  );
};

export default TodayPage;
