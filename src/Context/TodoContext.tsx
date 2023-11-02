import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { addTodo, updateTodo } from "@/Redux/Todos/TodosSlice";
import { TSubTask, TTodo } from "@/interface";
import { useAppDispatch } from "@/Hooks";
import { TODO_PAGES } from "@/Utils";
import { updateSubTask } from "@/Redux/SubTasks/SubTasksSlice";
import { v4 as uuidv4 } from "uuid";

type ContextValueProps = {
  handleAddTodo: () => void;
  handleAddTaskInSubTask: (subTask: TSubTask) => void;
  handleUpdateTaskInSubTask: (subTask: TSubTask, updatedTask: TTodo) => void;
  handleUpdateTodo: (updatedTodo: TTodo) => void;
  handleCancelTodo: (type?: string) => void;
  isLoadingAddTodo: boolean;
  isLoadingUpdateTodo: boolean;
  todo: TTodo;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  handleChangeTodo: (name: string, value: any) => void;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoContext = createContext<ContextValueProps>(
  {} as ContextValueProps
);

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
  const [isLoadingUpdateTodo, setIsLoadingUpdateTodo] =
    useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleChangeTodo = useCallback((name: string, value: any) => {
    setTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }, []);

  const handleAddTodo = useCallback(async () => {
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
  }, [todo, dispatch]);

  const handleAddTaskInSubTask = useCallback(
    async (subTask: TSubTask) => {
      try {
        setIsLoadingAddTodo(true);

        await dispatch(
          updateSubTask({
            group: "subTasks",
            subTask: {
              ...subTask,
              tasks: [
                ...subTask.tasks,
                { ...todo, id: uuidv4(), isCompleted: false },
              ],
            },
          })
        );
        setIsLoadingAddTodo(false);
      } catch (error) {
        console.error(error);
        throw new Error("Can not add subtask");
      }
    },
    [todo, dispatch]
  );

  const handleUpdateTaskInSubTask = useCallback(
    async (subTask: TSubTask, updatedTask: TTodo) => {
      try {
        setIsLoadingAddTodo(true);
        const updateTasks = [...subTask.tasks].map((task) => {
          if (task.id === updatedTask.id) return updatedTask;
          return task;
        });
        await dispatch(
          updateSubTask({
            group: "subTasks",
            subTask: {
              ...subTask,
              tasks: updateTasks,
            },
          })
        );
        setIsLoadingAddTodo(false);
      } catch (error) {
        console.error(error);
        throw new Error("Can edit task in subtask");
      }
    },
    [todo, dispatch]
  );

  const handleUpdateTodo = useCallback(
    async (updatedTodo: TTodo) => {
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
    },
    [dispatch]
  );

  const handleCancelTodo = useCallback((type?: string) => {
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
  }, []);

  const contextValue = useMemo(() => {
    return {
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
      handleAddTaskInSubTask,
      handleUpdateTaskInSubTask,
    };
  }, [
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
    handleAddTaskInSubTask,
    handleUpdateTaskInSubTask,
  ]);

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
