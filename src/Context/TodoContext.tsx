import { useDate } from "src/Hooks/use-date";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import {
  tomorrow as tomorrowIcon,
  today as todayIcon,
  nextWeek as nextWeekIcon,
  nextWeekend as nextWeekendIcon,
  noDate,
} from "src/assets";
import { addTodo } from "src/Redux/Todos/TodosSlice";
import { DaysInWeek, TDateList, TShowDueDate, TTodo } from "src/interface";
import { useAppDispatch } from "src/Hooks";
import { TODO_PROPERTIES, TODO_TYPES } from "src/Utils";
import { JsxElement } from "typescript";

export const TodoContext = createContext<{
  handleAddTodo: () => void;
  handleCancelTodo: (type?: string) => void;
  todo: TTodo;
  isLoadingAddTodo: boolean;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  handleChangeTodo: (name: string, value: any) => void;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}>({} as any);

type Props = {
  children: ReactNode;
};

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todo, setTodo] = useState<TTodo>({
    taskName: "",
    description: "",
    priority: 4,
    dueDate: "",
  });

  const [isLoadingAddTodo, setIsLoadingAddTodo] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleChangeTodo = (name: string, value: any) => {
    setTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddTodo = async () => {
    setIsLoadingAddTodo(true);
    await dispatch(
      addTodo({
        group: "todos",
        todo: {
          // id: uuidv4(),
          ...todo,
          isCompleted: false,
        } as TTodo,
      })
    );
    setIsLoadingAddTodo(false);
  };

  const handleCancelTodo = (type?: string) => {
    if (type === TODO_TYPES.TODAY) {
      setTodo({
        taskName: "",
        description: "",
        priority: 4,
        dueDate: new Date().toDateString(),
      });
    } else {
      setTodo({
        taskName: "",
        description: "",
        priority: 4,
        dueDate: "",
      });
    }
    // console.log(todo)
  };

  return (
    <TodoContext.Provider
      value={{
        handleAddTodo,
        handleCancelTodo,
        isLoadingAddTodo,
        todo,
        setTodo,
        handleChangeTodo,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
