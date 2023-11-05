import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { getTodos } from "@/Redux/Todos/TodosSlice";
import { TODOITEM_TYPES } from "@/Utils";
import { DownOutlined, RightOutlined } from "@ant-design/icons";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const [isShowCompleted, setIsShowCompleted] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.account);

  useEffect(() => {
    dispatch(getTodos(user.uid));
  }, []);

  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <section>
      <ul>
        {todos
          .filter((todo) => !todo.isCompleted)
          .map((todo) => {
            return (
              <TodoItem key={todo?.id} todo={todo} type={TODOITEM_TYPES.FULL} />
            );
          })}
      </ul>
      {todos.filter((todo) => todo.isCompleted).length ? (
        <div
          className="text-medium text-textGray inline-flex gap-2 bg-[#f5f5f5] px-1 rounded-[3px] cursor-pointer"
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
        <ul>
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
  );
};

export default TodoList;
