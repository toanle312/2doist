import { TagOutlined } from "@ant-design/icons";
import React, { useContext, useEffect } from "react";
import "./TodoModal.scss";
import { Priority } from "./Priority/Priority";
import { DueDate } from "./DueDate/DueDate";
import { TodoContext } from "src/Context/TodoContext";

export type Props = {
  setAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
};

export const TodoModal: React.FC<Props> = ({ setAddTodo, type }) => {
  const {
    taskName,
    setTaskName,
    description,
    setDescription,
    handleCancelTodo,
    handleAddTodo,
    setDueDate,
    setShowDueDate,
  } = useContext(TodoContext);

  // Check if in tab today (type = today)
  useEffect(() => {
    if (type === "Today") {
      setDueDate(new Date().toDateString());
      setShowDueDate({
        text: "Today",
        color: "#4b9244",
      }); //
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <DueDate />
        <Priority />
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
              handleCancelTodo();
              setAddTodo(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-primary text-white btn"
            disabled={taskName === ""}
            onClick={() => {
              handleAddTodo();
              handleCancelTodo();
            }}
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};
