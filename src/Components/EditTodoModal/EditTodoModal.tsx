import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { TTodo } from "src/interface";
import TodoItem from "../TodoList/TodoItem";
import { Priority } from "../TodoModal/Priority/Priority";
import DueDateProvider from "src/Context/DueDateContext";
import { DueDate } from "../TodoModal/DueDate/DueDate";
import { DUEDATE_TYPES } from "src/Utils";

import "./EditTodoModal.scss"
import { hover } from "@testing-library/user-event/dist/hover";
import { TodoContext } from "src/Context/TodoContext";

type Props = {
  isOpenEditTodoModal: boolean;
  setIsOpenEditTodoModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentTodo: TTodo;
};

const EditTodoModal: React.FC<Props> = ({
  isOpenEditTodoModal,
  setIsOpenEditTodoModal,
}) => {
  const { todo, handleUpdateTodo } = useContext(TodoContext);
  return (
    <Modal
      destroyOnClose={true}
      width={"900px"}
      centered
      open={isOpenEditTodoModal}
      onCancel={() => {
        setIsOpenEditTodoModal(false);
      }}
      footer={null}
    >
      <div className="flex flex-col mt-7 mx-[-24px]">
        <hr />
        <div className="flex w-full h-full">
          <div className="flex flex-col basis-[75%] p-4 h-full">
            <TodoItem todo={todo} type="SHORT" />
            <button className="add-subtask-btn w-[106px] mt-5 ml-[24px]">
              <PlusOutlined/> Add sub-task
            </button>
          </div>
          <div className="basis-[25%] p-2 bg-[#fafafa] h-full">
            <div className="flex flex-col gap-2">
              <div>
                <h1>Project</h1>
                <hr className="mb-2" />
                <p>Inbox</p>
              </div>
              <div>
                <h1>Due Date</h1>
                <hr className="mb-2" />
                <DueDateProvider>
                  <DueDate position="left" type={DUEDATE_TYPES.FULL} />
                </DueDateProvider>
              </div>
              <div>
                <h1>Priority</h1>
                <hr className="mb-2" />
                <Priority />
              </div>
            </div>
          </div>
        </div>
        <div className="modal__footer mt-10 mx-5">
          <div></div>
          <div className="flex gap-2">
            <button
              className="bg-[#f5f5f5] text-black btn"
              onClick={() => {
                setIsOpenEditTodoModal(false);  
              }}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white btn"
              disabled={todo?.taskName === ""}
              onClick={() => {
                handleUpdateTodo(todo);
                setIsOpenEditTodoModal(false);
              }}
            >
              Save
            </button>

          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditTodoModal;
