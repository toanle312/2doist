import { useAppSelector } from "@/Hooks";
import SubTaskItem from "./SubTaskItem";

const SubTaskList: React.FC = () => {
  const subTasks = useAppSelector((state) => state.todos.currentTodo.subTasks);
  return (
    <ul>
      {subTasks?.map((subtask) => {
        return <SubTaskItem key={subtask.id} task={subtask} />;
      })}
    </ul>
  );
};

export default SubTaskList;
