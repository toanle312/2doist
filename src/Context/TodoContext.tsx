import { createContext, useMemo, useState } from "react";
import { useDate } from "src/Hooks/use-date";
import {
  tomorrow as tomorrowIcon,
  today as todayIcon,
  nextWeek as nextWeekIcon,
  nextWeekend as nextWeekendIcon,
  noDate,
} from "src/assets";
import { addTodo } from "src/Redux/Todos/TodosSlice";
import { Priority, TodoDTO } from "src/interface";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "src/Hooks";

export const TodoContext = createContext<{
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  dueDate: string;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
  showDueDate: ShowDueDate;
  setShowDueDate: React.Dispatch<React.SetStateAction<ShowDueDate>>;
  isOpenDueDate: boolean;
  setIsOpenDueDate: React.Dispatch<React.SetStateAction<boolean>>;
  dateList: DateList[];
  handleAddTodo: () => void;
  handleCancelTodo: () => void;
  isLoadingAddTodo: boolean;
}>({} as any);

type ShowDueDate = {
  color: string;
  text: string;
};

type DateList = {
  id: string;
  icon: string;
  date: string;
  content: string;
  color: string;
};

const TodoProvider = ({ children }: any) => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("Priority");
  const [dueDate, setDueDate] = useState<string>("");
  const [showDueDate, setShowDueDate] = useState<ShowDueDate>({
    color: "",
    text: "Due Date",
  });
  const [isOpenDueDate, setIsOpenDueDate] = useState<boolean>(false);
  const [isLoadingAddTodo, setIsLoadingAddTodo] = useState<boolean>(false);

  const { today, tomorrow, nextWeek, nextWeekend } = useDate();
  const dateList = useMemo(() => {
    return [
      {
        id: "Today",
        icon: todayIcon,
        date: today,
        content: "Today",
        color: "#4b9244",
      },
      {
        id: "Tomorrow",
        icon: tomorrowIcon,
        date: tomorrow,
        content: "Tomorrow",
        color: "#ad6200",
      },
      {
        id: "Next weekend",
        icon: nextWeekendIcon,
        date: nextWeekend,
        content: "Next weekend",
        color: "#246fe0",
      },
      {
        id: "Next week",
        icon: nextWeekIcon,
        date: nextWeek,
        content: "Next week",
        color: "#69cec2",
      },
      {
        id: "No Date",
        icon: noDate,
        date: "",
        content: "No Date",
        color: "",
      },
    ];
  }, [today, tomorrow, nextWeek, nextWeekend]);

  const dispatch = useAppDispatch();

  const handleAddTodo = async () => {
    setIsLoadingAddTodo(false);
    await dispatch(
      addTodo({
        group: "todos",
        todo: {
          taskName,
          priority: Priority[priority as keyof typeof Priority],
          description,
          dueDate,
        } as TodoDTO,
      })
    );
    setIsLoadingAddTodo(true);

  };

  const handleCancelTodo = () => {
    setPriority("Priority");
    setTaskName("");
    setDescription("");
    setDueDate("");
  };

  return (
    <TodoContext.Provider
      value={{
        taskName,
        setTaskName,
        description,
        setDescription,
        priority,
        setPriority,
        dueDate,
        setDueDate,
        showDueDate,
        setShowDueDate,
        isOpenDueDate,
        setIsOpenDueDate,
        dateList,
        handleAddTodo,
        handleCancelTodo,
        isLoadingAddTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
