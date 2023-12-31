import { useContext, useState } from "react";
import TodoItem from "./TodoItem";
import { useAppSelector, useTodoList } from "@/Hooks";
import { GROUPING_TYPE, TODOITEM_TYPES, TODO_PAGES } from "@/Utils";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import { ViewContext } from "@/Context/ViewContext";
import { DaysInWeek, TTodo } from "@/interface";

type Props = {
  page?: string;
  initTodoList?: TTodo[];
};

/**
 *
 * @param type type of todo page
 * @returns
 */
const TodoList: React.FC<Props> = ({ page, initTodoList }) => {
  const [isShowCompleted, setIsShowCompleted] = useState<boolean>(false);

  const currentProject = useAppSelector(
    (state) => state.projects.currentProject
  );

  const { listView, groupingType, sortingType, direction } =
    useContext(ViewContext);

  const {
    overDueTodoList,
    completedTodoList,
    uncompletedTodoList,
    groupingTodoList,
  } = useTodoList(
    page as string,
    currentProject,
    sortingType,
    direction,
    groupingType,
    initTodoList
  );

  if (groupingType !== GROUPING_TYPE.DEFAULT) {
    let groupingKeys = [];
    for (const key in groupingTodoList) {
      groupingKeys.push(key);
    }
    if (groupingType === GROUPING_TYPE.PRIORITY) {
      groupingKeys = groupingKeys.sort();
    } else {
      groupingKeys = groupingKeys.sort((d1, d2) => {
        return new Date(d1).getTime() - new Date(d2).getTime();
      });
    }
    return (
      <section className={`${listView === "Board" ? "flex gap-4" : "w-full"}`}>
        {overDueTodoList.length ? (
          <section
            className={`${
              listView === "Board" ? "w-[200px] flex-shrink-0" : "w-full"
            }`}
          >
            <div className="font-medium text-md mb-2">Overdue Date</div>
            {listView === "Board" ? "" : <hr />}
            <ul className="w-full">
              {overDueTodoList.map((todo) => {
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
        {groupingKeys.map((key) => {
          return (
            <section
              className={`${
                listView === "Board" ? "w-[200px] flex-shrink-0" : "w-full"
              }`}
            >
              <div className="font-medium text-md mb-2">
                {groupingType === GROUPING_TYPE.PRIORITY ? (
                  key
                ) : key ? (
                  <span>
                    {key.split(" ").slice(1).join(" ")} &#x2022;{" "}
                    {key === new Date().toDateString() && (
                      <span> Today &#x2022; </span>
                    )}
                    {DaysInWeek[new Date(key).getDay()]}
                  </span>
                ) : (
                  "No due date"
                )}
              </div>
              {listView === "Board" ? "" : <hr />}
              <ul className="w-full mb-8">
                {groupingTodoList &&
                  groupingTodoList[key].map((todo) => {
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
          );
        })}
      </section>
    );
  }

  return (
    <section className={`${listView === "Board" ? "flex gap-4" : "w-full"}`}>
      {overDueTodoList.length ? (
        <section
          className={`${
            listView === "Board" ? "w-[200px] flex-shrink-0" : "w-full"
          }`}
        >
          <div className="font-medium text-md mb-2">Overdue Date</div>
          {listView === "Board" ? "" : <hr />}
          <ul className="w-full">
            {overDueTodoList.map((todo) => {
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
      {uncompletedTodoList.length ? (
        <section
          className={`${
            listView === "Board" ? "w-[200px] flex-shrink-0" : "w-full"
          }`}
        >
          {listView === "Board" && page === TODO_PAGES.TODAY ? (
            <div className="font-medium text-md mb-2">Today</div>
          ) : (
            ""
          )}
          <ul className="w-full">
            {uncompletedTodoList.map((todo) => {
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
      <section
        className={`${
          listView === "Board" ? "w-[200px] flex-shrink-0" : "w-full"
        }`}
      >
        {completedTodoList.length ? (
          <div
            className="text-medium text-white inline-flex gap-2 bg-primary px-1 rounded-[3px] cursor-pointer"
            onClick={() => {
              setIsShowCompleted(!isShowCompleted);
            }}
          >
            {isShowCompleted ? <DownOutlined /> : <RightOutlined />}
            <span className="font-medium">Completed</span>
            {completedTodoList.length}
          </div>
        ) : (
          ""
        )}
        {isShowCompleted ? (
          <ul className="w-full">
            {completedTodoList.map((todo) => {
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
