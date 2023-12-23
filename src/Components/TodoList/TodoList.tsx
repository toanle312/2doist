import { useContext, useState } from "react";
import TodoItem from "./TodoItem";
import { useAppSelector, useFetch } from "@/Hooks";
import { TODOITEM_TYPES, TODO_PAGES } from "@/Utils";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import { ViewContext } from "@/Context/ViewContext";

type Props = {
  type?: string;
};

/**
 *
 * @param type type of todo page
 * @returns
 */
const TodoList: React.FC<Props> = ({ type }) => {
  const [isShowCompleted, setIsShowCompleted] = useState<boolean>(false);

  const currentProject = useAppSelector(
    (state) => state.projects.currentProject
  );

  const todos = useAppSelector((state) => state.todos.todos).filter((todo) => {
    if (type === TODO_PAGES.TODAY) {
      return todo.dueDate === new Date().toDateString();
    } else if (type === TODO_PAGES.PROJECT) {
      return todo.project === currentProject?.id;
    } else return todo.project === TODO_PAGES.TASKS;
  });

  const { listView } = useContext(ViewContext);

  return (
    <section className={`${listView === "Board" ? "flex gap-4" : "w-full"}`}>
      {todos.filter(
        (todo) => new Date(todo.dueDate).getDate() < new Date().getDate()
      ).length ? (
        <section className={`${listView === "Board" ? "w-[200px]" : "w-full"}`}>
          <div>Overdue Date</div>
          <ul className="w-full">
            {todos
              .filter(
                (todo) =>
                  new Date(todo.dueDate).getDate() < new Date().getDate()
              )
              .reverse()
              .map((todo) => {
                return (
                  <TodoItem
                    key={todo?.id}
                    todo={todo}
                    type={TODOITEM_TYPES.FULL}
                  />
                );
              })}
          </ul>
        </section>
      ) : (
        ""
      )}
      {todos.filter((todo) => !todo.isCompleted).length ? (
        <section className={`${listView === "Board" ? "w-[200px]" : "w-full"}`}>
          {listView === "Board" ? <div>Today</div> : ""}
          <ul className="w-full">
            {todos
              .filter((todo) => !todo.isCompleted)
              .map((todo) => {
                return (
                  <TodoItem
                    key={todo?.id}
                    todo={todo}
                    type={TODOITEM_TYPES.FULL}
                  />
                );
              })}
          </ul>
        </section>
      ) : (
        ""
      )}
      <section className={`${listView === "Board" ? "w-[200px]" : "w-full"}`}>
        {todos.filter((todo) => todo.isCompleted).length ? (
          <div
            className="text-medium text-white inline-flex gap-2 bg-primary px-1 rounded-[3px] cursor-pointer"
            onClick={() => {
              setIsShowCompleted(!isShowCompleted);
            }}
          >
            {isShowCompleted ? <DownOutlined /> : <RightOutlined />}
            <span className="font-medium">Completed</span>
            {todos.filter((todo) => todo.isCompleted).length}
          </div>
        ) : (
          ""
        )}
        {isShowCompleted ? (
          <ul className="w-full">
            {todos
              .filter((todo) => todo.isCompleted)
              .reverse()
              .map((todo) => {
                return (
                  <TodoItem
                    key={todo?.id}
                    todo={todo}
                    type={TODOITEM_TYPES.FULL}
                  />
                );
              })}
          </ul>
        ) : (
          ""
        )}
      </section>
    </section>
  );
};

export default TodoList;
