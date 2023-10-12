import { Checkbox, Radio } from "antd";
import React, { memo, useContext, useEffect, useState } from "react";
import { TTodo } from "src/interface";

import "./TodoItem.scss";
import {
  CalendarOutlined,
  CheckOutlined,
  CommentOutlined,
  EditOutlined,
  EllipsisOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "src/Hooks";
import { updateTodo } from "src/Redux/Todos/TodosSlice";
import { TodoModal } from "../TodoModal/TodoModal";
import { TodoContext } from "src/Context/TodoContext";

type Props = {
  todo: TTodo;
  selectedItem?: string;
  setSelectedItem?: React.Dispatch<React.SetStateAction<string>>;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodo, selectedItem, setSelectedItem } = useContext(TodoContext);

  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleToggle:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = async () => {
    try {
      dispatch(
        updateTodo({
          group: "todos",
          todo: {
            ...todo,
            isCompleted: true,
          },
        })
      );
    } catch (error) {
      console.error(error);
      throw new Error("Can not add todo");
    }
  };

  return (
    <li className="todo-item relative">
      {isEditTodo && todo?.id === selectedItem ? (
        <TodoModal setAddTodo={setIsEditTodo} />
      ) : (
        <>
          <section className="flex items-start py-1">
            <button
              className="checkbox-btn mr-2 mt-[4px]"
              onClick={handleToggle}
            >
              <CheckOutlined className={"hidden check-icon"} />
            </button>
            <section className="w-full">
              <section className="flex justify-between mb-2">
                <p className="text-medium">{todo.taskName}</p>
                <section className="control-list absolute right-[-42px]">
                  <p
                    className="control-item"
                    onClick={() => {
                      setTodo(todo);
                      setIsEditTodo(true);
                      setSelectedItem(todo?.id as string);
                    }}
                  >
                    <EditOutlined />
                  </p>
                  <p className="control-item">
                    <CalendarOutlined />
                  </p>
                  <p className="control-item">
                    <CommentOutlined />
                  </p>
                  <p className="control-item">
                    <EllipsisOutlined />
                  </p>
                </section>
              </section>
              <p className="text-small text-textGray">{todo.description}</p>
              <p className="flex justify-end text-small">Inbox</p>
            </section>
          </section>
          <hr />
        </>
      )}
    </li>
  );
};

export default TodoItem;
