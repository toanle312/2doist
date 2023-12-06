import React from "react";
import "./style.scss";
import { Todo } from "@/Components/Todo/Todo";
import { useDate } from "@/Hooks/useDate";
import TodoProvider from "@/Context/TodoContext";
import TodoList from "@/Components/TodoList/TodoList";
import { TODO_PAGES } from "@/Utils";

const TodayPage: React.FC = () => {
  const { today } = useDate();
  return (
    <div className="control">
      <header className="today-header">
        <div className="today-header__content">
          <div>
            <span className="text-[20px] font-bold mr-2">Today</span>
            <span className="text-[14px] text-textGray">{today}</span>
          </div>
          <div>view</div>
        </div>
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
  );
};

export default TodayPage;
