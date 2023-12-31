import { Modal, Select } from "antd";
import React, { useContext, useEffect } from "react";
import TodoItem from "@/Components/TodoList/TodoItem";
import { Priority } from "@/Components/TodoModal/Priority/Priority";
import DueDateProvider from "@/Context/DueDateContext";
import { DueDate } from "@/Components/TodoModal/DueDate/DueDate";
import { DUEDATE_TYPES, TODOITEM_TYPES, TODO_PROPERTIES } from "@/Utils";

import "./EditTodoModal.scss";
import { TodoContext } from "@/Context/TodoContext";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import SubTasksControl from "@/Components/SubTasks/SubTasksControl";

// import TodoProvider as SubTaskProvider (subtask is same structure as todo)
import { default as SubTaskProvider } from "@/Context/TodoContext";
import { todosSlice } from "@/Redux/Todos/TodosSlice";
import { ThemeContext } from "@/Context/ThemeContext";
import Spinning from "@/Pages/LoadingPage/Spinning";

type Props = {
  isOpenEditTodoModal: boolean;
  setIsOpenEditTodoModal: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 *
 * @param isOpenEditTodoModal prop to check if edit todo modal is open
 * @param setIsOpenEditTodoModal function to handle open edit todo modal
 * @returns
 */
const EditTodoModal: React.FC<Props> = ({
  isOpenEditTodoModal,
  setIsOpenEditTodoModal,
}) => {
  const dispatch = useAppDispatch();
  const { todo, handleUpdateTodo, handleChangeTodo, isLoadingUpdateTodo } =
    useContext(TodoContext);

  useEffect(() => {
    dispatch(todosSlice.actions.getCurrentTodo(todo.id));
  }, [todo.id]);

  const currentTodo = useAppSelector((state) => state.todos.currentTodo);

  const projects = useAppSelector((state) => state.projects.projects);

  const handleSaveTodoModal = async () => {
    await handleUpdateTodo({ ...todo, subTasks: currentTodo.subTasks });
    setIsOpenEditTodoModal(false);
  };

  const handleCancelTodoModal = () => {
    setIsOpenEditTodoModal(false);
  };

  const { isDarkTheme } = useContext(ThemeContext);

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
      <div className={`edit-modal ${isDarkTheme ? "dark-mode" : ""}`}>
        <hr />

        <div
          className={`${
            isLoadingUpdateTodo && "disabled"
          } flex w-full h-[480px]`}
        >
          <div className="flex flex-col basis-[70%] p-4 h-full overflow-y-auto">
            <TodoItem todo={todo} type={TODOITEM_TYPES.SHORT} />
            <SubTaskProvider>
              <SubTasksControl />
            </SubTaskProvider>
          </div>
          <div
            className={`basis-[30%] p-2 ${
              isDarkTheme ? "bg-[#282828]" : "bg-[#fafafa]"
            } h-full ${todo.isCompleted ? "disabled" : ""}`}
          >
            <div className="modal__control flex flex-col gap-2">
              <div>
                <h1>Project</h1>
                <hr className="mb-2" />
                <Select
                  style={{ width: "150px" }}
                  onChange={(value) => {
                    handleChangeTodo(TODO_PROPERTIES.PROJECT, value);
                  }}
                  onSelect={(value) => {
                    handleChangeTodo(TODO_PROPERTIES.PROJECT, value);
                  }}
                  value={todo?.project}
                  options={[
                    {
                      value: "Tasks",
                      label: "Tasks",
                    },
                    {
                      label: "Projects",
                      options: [
                        ...projects.map((project) => ({
                          value: project.id,
                          label: project.projectName,
                        })),
                      ],
                    },
                  ]}
                />
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
        <div
          className={`modal__footer mb-[-0.5rem] mt-3 mx-3 ${
            isDarkTheme ? "dark-mode " : ""
          }`}
        >
          <div></div>
          <div className="flex gap-2">
            <button
              className="bg-[#f5f5f5] text-black btn"
              onClick={handleCancelTodoModal}
            >
              Cancel
            </button>

            {isLoadingUpdateTodo ? (
              <Spinning />
            ) : (
              <button
                className="!bg-primary !text-white btn"
                disabled={todo?.taskName === ""}
                onClick={handleSaveTodoModal}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditTodoModal;
