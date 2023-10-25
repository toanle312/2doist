import { ReactNode, createContext, useState } from "react";
import { addTodo, updateTodo } from "src/Redux/Todos/TodosSlice";
import { TTodo } from "src/interface";
import { useAppDispatch } from "src/Hooks";
import { TODO_PAGES } from "src/Utils";

export const TodoContext = createContext<{
  handleAddTodo: () => void;
  handleUpdateTodo: (updatedTodo: TTodo) => void;
  handleCancelTodo: (type?: string) => void;
  todo: TTodo;
  isLoadingAddTodo: boolean;
  isLoadingUpdateTodo: boolean;
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
  const [isLoadingUpdateTodo, setIsLoadingUpdateTodo] = useState<boolean>(false);

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
    try {
      setIsLoadingAddTodo(true);
      await dispatch(
        addTodo({
          group: "todos",
          todo: {
            ...todo,
            isCompleted: false,
          } as TTodo,
        })
      );
      setIsLoadingAddTodo(false);
    } catch (error) {
      console.error(error);
      throw new Error("Can not add todo");
    }
  };

  const handleUpdateTodo = async (updatedTodo: TTodo) => {
    try {
      setIsLoadingUpdateTodo(true);
      dispatch(
        updateTodo({
          group: "todos",
          todo: {
            ...updatedTodo,
          },
        })
      ).unwrap();
      setIsLoadingUpdateTodo(false);
    } catch (error) {
      console.error(error);
      throw new Error("Can not update todo");
    }
  };

  const handleCancelTodo = (type?: string) => {
    if (type === TODO_PAGES.TODAY) {
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
  };

  return (
    <TodoContext.Provider
      value={{
        handleAddTodo,
        handleUpdateTodo,
        handleCancelTodo,
        isLoadingAddTodo,
        isLoadingUpdateTodo,
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
