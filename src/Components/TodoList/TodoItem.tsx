import { Checkbox, Radio } from "antd";
import React from "react";
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

type Props = {
  todo: TTodo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <li className="todo-item relative">
      <section className="flex items-start py-1">
        <button className="checkbox-btn mr-2 mt-[4px]">
          <CheckOutlined className={"hidden check-icon"} />
        </button>
        <section className="w-full">
          <section className="flex justify-between mb-2">
            <p className="text-medium">{todo.taskName}</p>
            <section className="control-list absolute right-[-42px]">
              <p className="control-item">
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
      <hr/>

    </li>
  );
};

export default TodoItem;
