import { CalendarOutlined, FlagOutlined, TagOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useMemo, useState } from "react";
import { priorities } from "src/assets";
import "./TodoModal.scss";
import { Priority } from "../Priority/Priority";

export type Props = {
  setAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoModal: React.FC<Props> = ({ setAddTodo }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [priority, setPriority] = useState<string>("Priority");

  return (
    <div className="modal">
      <input
        className="modal__input font-medium"
        placeholder="Task name"
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
      <input
        className="modal__input"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <div className="modal__control">
        <button className="modal__control-item">
          <CalendarOutlined />
          Due date
        </button>
        <Priority priority={priority} setPriority={setPriority} />
        <button className="modal__control-item">
          <TagOutlined />
          Label
        </button>
      </div>
      <hr />
      <div className="modal__footer">
        <div>Choose here</div>
        <div className="flex gap-2">
          <button
            className="bg-[#f5f5f5] text-black btn"
            onClick={() => {
              setAddTodo(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-primary text-white btn"
            disabled={taskName === ""}
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};
