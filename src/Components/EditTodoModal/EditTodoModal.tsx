import { Modal } from "antd";
import React, { useContext, useEffect } from "react";
import { TTodo } from "@/interface";
import TodoItem from "@/Components/TodoList/TodoItem";
import { Priority } from "@/Components/TodoModal/Priority/Priority";
import DueDateProvider from "@/Context/DueDateContext";
import { DueDate } from "@/Components/TodoModal/DueDate/DueDate";
import { DUEDATE_TYPES, TODOITEM_TYPES } from "@/Utils";

import "./EditTodoModal.scss";
import { default as SubTaskProvider } from "@/Context/TodoContext";
import { TodoContext } from "@/Context/TodoContext";
import { useAppDispatch } from "@/Hooks";
import { getSubTasks } from "@/Redux/SubTasks/SubTasksSlice";

import SubTasksControl from "./SubTasksControl";

type Props = {
  isOpenEditTodoModal: boolean;
  setIsOpenEditTodoModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentTodo: TTodo;
};

const EditTodoModal: React.FC<Props> = ({
  isOpenEditTodoModal,
  setIsOpenEditTodoModal,
}) => {
  const dispatch = useAppDispatch();
  const { todo, handleUpdateTodo } = useContext(TodoContext);

  useEffect(() => {
    dispatch(getSubTasks(todo?.id as string));
  }, [todo?.id]);

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
        <div className="flex w-full h-[480px]">
          <div className="flex flex-col basis-[70%] p-4 h-full overflow-y-scroll">
            <TodoItem todo={todo} type={TODOITEM_TYPES.SHORT} />
            <SubTaskProvider>
              <SubTasksControl />
            </SubTaskProvider>
          </div>
          <div className="basis-[30%] p-2 bg-[#fafafa] h-full">
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
        <hr />
        <div className="modal__footer mb-[-0.5rem] mt-3 mx-3">
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
