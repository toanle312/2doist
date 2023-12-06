import { useAppSelector } from "@/Hooks";
import { DownOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { TodoContext as SubTaskContext } from "@/Context/TodoContext";
import SubTaskList from "../SubTasks/SubTaskList";
import { SubTaskModal } from "../TodoModal/SubTaskModal";
import { MODAL_TYPES } from "@/Utils";
import { ThemeContext } from "@/Context/ThemeContext";

const SubTasksControl = () => {
  const [isOpenAddSubTask, setIsOpenAddSubTask] = useState<boolean>(false);
  const [isShowSubTasks, setIsShowSubTasks] = useState<boolean>(true);

  const {
    selectedItem,
    setSelectedItem,
    handleCancelTodo: handleCancelTask,
  } = useContext(SubTaskContext);

  const currentTodo = useAppSelector((state) => state.todos.currentTodo);

  const { isDarkTheme } = useContext(ThemeContext);

  if (currentTodo.subTasks?.length) {
    return (
      <section className="ml-[24px]">
        <div className="flex flex-col h-full">
          <div
            className="flex gap-2 text-textGray cursor-pointer mb-3"
            onClick={() => {
              setIsShowSubTasks(!isShowSubTasks);
            }}
          >
            {isShowSubTasks ? <DownOutlined /> : <RightOutlined />}
            <span
              className={`font-medium ${
                isDarkTheme ? "text-white" : "text-textColor"
              }`}
            >
              Sub-tasks
            </span>{" "}
            {currentTodo.subTasks.filter((task) => task.isCompleted).length}/
            {currentTodo.subTasks.length}
          </div>
          {isShowSubTasks && (
            <section>
              <SubTaskList />
              {!currentTodo.isCompleted &&
                (!isOpenAddSubTask || selectedItem !== "nothing" ? (
                  <button
                    className="add-subtask-btn w-[106px] mt-5 ml-[24px]"
                    onClick={() => {
                      setIsOpenAddSubTask(true);
                      setSelectedItem("nothing");
                      handleCancelTask();
                    }}
                  >
                    <PlusOutlined /> Add sub-task
                  </button>
                ) : (
                  <SubTaskModal
                    setIsModalOpen={setIsOpenAddSubTask}
                    type={MODAL_TYPES.ADD}
                  ></SubTaskModal>
                ))}
            </section>
          )}
        </div>
      </section>
    );
  }

  if (!currentTodo.isCompleted && !isOpenAddSubTask) {
    return (
      <button
        className="!flex-[0] add-subtask-btn w-[106px] mt-5 ml-[24px]"
        onClick={() => {
          setIsOpenAddSubTask(true);
        }}
      >
        <PlusOutlined /> Add sub-task
      </button>
    );
  }

  return (
    <SubTaskModal
      setIsModalOpen={setIsOpenAddSubTask}
      type={MODAL_TYPES.ADD}
    ></SubTaskModal>
  );
};

export default SubTasksControl;
