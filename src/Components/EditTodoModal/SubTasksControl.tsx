import { useAppDispatch, useAppSelector } from "@/Hooks";
import { DownOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { default as SubTaskProvider, TodoContext } from "@/Context/TodoContext";
import SubTaskList from "../SubTasks/SubTaskList";
import { SubTaskModal } from "../TodoModal/SubTaskModal";
import { getSubTasks } from "@/Redux/SubTasks/SubTasksSlice";
import { MODAL_TYPES } from "@/Utils";

const SubTasksControl = () => {
  const [isOpenAddSubTask, setIsOpenAddSubTask] = useState<boolean>(false);
  const [isShowSubTasks, setIsShowSubTasks] = useState<boolean>(true);

  const { selectedItem, setSelectedItem, handleCancelTodo } =
    useContext(TodoContext);

  const currentSubTask = useAppSelector((state) => state.subTasks.subTask);

  return (
    <div>
      {currentSubTask?.tasks?.length ? (
        <section className="ml-[24px]">
          <div className="flex flex-col h-full">
            <div
              className="flex gap-2 text-textGray cursor-pointer"
              onClick={() => {
                setIsShowSubTasks(!isShowSubTasks);
              }}
            >
              {isShowSubTasks ? <DownOutlined /> : <RightOutlined />}
              <span className="text-textColor font-medium">Sub-tasks</span>{" "}
              {currentSubTask.tasks.filter((task) => task.isCompleted).length}/
              {currentSubTask.tasks.length}
            </div>
            {isShowSubTasks && (
              <>
                <SubTaskList />
                {!isOpenAddSubTask || selectedItem !== "nothing" ? (
                  <button
                    className="add-subtask-btn w-[106px] mt-5 ml-[24px]"
                    onClick={() => {
                      setIsOpenAddSubTask(true);
                      setSelectedItem("nothing");
                      handleCancelTodo();
                    }}
                  >
                    <PlusOutlined /> Add sub-task
                  </button>
                ) : (
                  <SubTaskModal
                    setIsModalOpen={setIsOpenAddSubTask}
                    subTask={currentSubTask}
                    type={MODAL_TYPES.ADD}
                  ></SubTaskModal>
                )}
              </>
            )}
          </div>
        </section>
      ) : !isOpenAddSubTask ? (
        <button
          className="!flex-[0] add-subtask-btn w-[106px] mt-5 ml-[24px]"
          onClick={() => {
            setIsOpenAddSubTask(true);
          }}
        >
          <PlusOutlined /> Add sub-task
        </button>
      ) : (
        <SubTaskModal
          setIsModalOpen={setIsOpenAddSubTask}
          subTask={currentSubTask}
          type={MODAL_TYPES.ADD}
        ></SubTaskModal>
      )}
    </div>
  );
};

export default SubTasksControl;
