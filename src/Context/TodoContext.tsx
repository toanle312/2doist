import { useDate } from "src/Hooks/use-date";
import { createContext, useEffect, useMemo, useState } from "react";
import {
  tomorrow as tomorrowIcon,
  today as todayIcon,
  nextWeek as nextWeekIcon,
  nextWeekend as nextWeekendIcon,
  noDate,
} from "src/assets";
import { addTodo } from "src/Redux/Todos/TodosSlice";
import { TDateList, Priority, TShowDueDate, TTodo } from "src/interface";
import { useAppDispatch } from "src/Hooks";
import {v4 as uuidv4} from "uuid";

export const TodoContext = createContext<{
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  showDueDate: TShowDueDate;
  setShowDueDate: React.Dispatch<React.SetStateAction<TShowDueDate>>;
  isOpenDueDate: boolean;
  setIsOpenDueDate: React.Dispatch<React.SetStateAction<boolean>>;
  dateList: TDateList[];
  handleAddTodo: () => void;
  handleCancelTodo: () => void;
  isLoadingAddTodo: boolean;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  todo: any;
  setTodo: React.Dispatch<React.SetStateAction<any>>;
  handleChangeTodo: (name: string, value: any) => void;
}>({} as any);

const TodoProvider = ({ children }: any) => {
  // Show current month and current year when scroll calendar 
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  const [todo, setTodo] = useState({
    taskName: "",
    description: "",
    priority: "Priority",
    dueDate: "",
  });

  const handleChangeTodo = (name: string, value: any) => {
    setTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [type, setType] = useState<string>("");

  const [showDueDate, setShowDueDate] = useState<TShowDueDate>({
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
    setIsLoadingAddTodo(true);
    await dispatch(
      addTodo({
        group: "todos",
        todo: {
          // id: uuidv4(),
          ...todo,
          priority: Priority[todo.priority as keyof typeof Priority],
        } as TTodo,
      })
    );
    setIsLoadingAddTodo(false);
  };

  const handleCancelTodo = () => {
    setTodo({
      taskName: "",
      description: "",
      priority: "Priority",
      dueDate: "",
    });
  };

  useEffect(() => {
    if (type === "Today") {
      setTodo((prev) => {
        return {
          ...prev,
          dueDate: new Date().toDateString(),
        };
      });
      setShowDueDate({
        text: "Today",
        color: "#4b9244",
      }); //
    } else if (type === "Inbox") {
      setTodo((prev) => {
        return {
          ...prev,
          dueDate: "",
        };
      });
      setShowDueDate({
        text: "Due Date",
        color: "",
      });
    }
    setType("");
  }, [type]);

  return (
    <TodoContext.Provider
      value={{
        showDueDate,
        setShowDueDate,
        isOpenDueDate,
        setIsOpenDueDate,
        dateList,
        handleAddTodo,
        handleCancelTodo,
        isLoadingAddTodo,
        type,
        setType,
        month,
        setMonth,
        year,
        setYear,
        todo,
        setTodo,
        handleChangeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
