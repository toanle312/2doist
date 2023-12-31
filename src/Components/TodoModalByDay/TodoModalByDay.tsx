import ViewProvider from "@/Context/ViewContext";
import { Modal } from "antd";
import React, { useContext, useState } from "react";
import TodoProvider from "@/Context/TodoContext";
import { TODO_PAGES, getTasksByDate } from "@/Utils";
import TodoList from "../TodoList/TodoList";
import { Todo } from "../Todo/Todo";
import { useAppSelector } from "@/Hooks";
import { DaysInWeek } from "@/interface";
import { ControlOutlined } from "@ant-design/icons";
import { ThemeContext } from "@/Context/ThemeContext";
import ViewControl from "../ViewControl/ViewControl";

type Props = {
  isOpenTodoModalByDay: boolean;
  setIsOpenTodoModalByDay: React.Dispatch<React.SetStateAction<boolean>>;
  chosenDate: Date;
};
const TodoModalByDay: React.FC<Props> = ({
  isOpenTodoModalByDay,
  setIsOpenTodoModalByDay,
  chosenDate,
}) => {
  const todos = useAppSelector((state) => state.todos.todos);
  const tasks = getTasksByDate(todos, chosenDate?.toDateString());
  const { isDarkTheme } = useContext(ThemeContext);
  const [isOpenViewControl, setIsOpenViewControl] = useState<boolean>(false);
  return (
    <Modal
      destroyOnClose={true}
      width={"900px"}
      centered
      open={isOpenTodoModalByDay}
      onCancel={() => {
        setIsOpenTodoModalByDay(false);
      }}
      footer={null}
    >
      <ViewProvider>
        <div className="flex flex-col justify-between h-[600px] mb-5">
          <header className="pt-[36px] px-[55px] mb-[24px] flex">
            <div className="page-header__content">
              <div>
                <span className="text-[20px] font-bold mr-2">
                  {chosenDate?.toDateString().split(" ").slice(1).join(" ")}{" "}
                  &#x2022;{" "}
                  {chosenDate?.toDateString() === new Date().toDateString() && (
                    <span> Today &#x2022; </span>
                  )}
                  {DaysInWeek[new Date(chosenDate?.toDateString()).getDay()]}
                </span>
              </div>
              <section className="relative">
                <button
                  className={`control-btn ${isDarkTheme ? "dark-mode" : ""}`}
                  onClick={() => {
                    setIsOpenViewControl(!isOpenViewControl);
                  }}
                >
                  <ControlOutlined /> View
                </button>
                {isOpenViewControl ? (
                  <ViewControl setIsOpenViewControl={setIsOpenViewControl} />
                ) : (
                  ""
                )}
              </section>
            </div>
          </header>
          <TodoProvider>
            <section className="w-full flex-1 overflow-y-auto px-[55px] hide-scrollbar">
              <div
                id="custom-scrollbar"
                className="m-auto max-w-[800px] w-full overflow-x-auto"
              >
                <TodoList page={TODO_PAGES.TASKS} initTodoList={tasks} />
              </div>
            </section>
            <section className="page-control">
              <div className="m-auto max-w-[800px] w-full">
                <Todo currentDate={chosenDate} page={TODO_PAGES.TASKS} />
              </div>
            </section>
          </TodoProvider>
        </div>
      </ViewProvider>
    </Modal>
  );
};

export default TodoModalByDay;
