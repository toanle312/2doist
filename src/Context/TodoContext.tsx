import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { addTodo, updateTodo } from "@/Redux/Todos/TodosSlice";
import { TSubTask, TTodo } from "@/interface";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { TODO_PAGES } from "@/Utils";
import { v4 as uuidv4 } from "uuid";

type ContextValueProps = {
  handleAddTodo: () => void;
  handleAddSubTask: (todo: TTodo, task: TTodo) => void;
  handleUpdateSubTask: (todo: TTodo, task: TTodo) => void;
  handleUpdateTodo: (updatedTodo: TTodo) => void;
  handleCancelTodo: (type?: string) => void;
  isLoadingAddTodo: boolean;
  isLoadingUpdateTodo: boolean;
  todo: TTodo;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  handleChangeTodo: (name: string, value: any) => void;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  isShowAlert: boolean;
  setIsShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoContext = createContext<ContextValueProps>(
  {} as ContextValueProps
);

type Props = {
  children: ReactNode;
};

const TodoProvider: React.FC<Props> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.account);
  const [todo, setTodo] = useState<TTodo>({
    taskName: "",
    description: "",
    priority: 4,
    dueDate: "",
    subTasks: [] as TTodo[],
    labels: [] as string[],
    isCompleted: false,
    owner: user.uid,
    project: "Tasks",
  });

  const [isLoadingAddTodo, setIsLoadingAddTodo] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
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

  /**
   * Add from current todo state
   */
  const handleAddTodo = useCallback(async () => {
    try {
      setIsLoadingAddTodo(true);
      if (new Date().toDateString() === todo.dueDate) {
        todo.project = "Today";
      } else todo.project = "Tasks";
      await dispatch(
        addTodo({
          group: "todos",
          todo: {
            ...todo,
          } as TTodo,
        })
      );
      setIsLoadingAddTodo(false);
    } catch (error) {
      console.error(error);
      throw new Error("Can not add todo");
    }
  }, [todo, dispatch]);

  /**
   * current todo is current subtask => add subtask is add todo but with different group
   */
  const handleAddSubTask = useCallback(
    async (todo: TTodo, task: TTodo) => {
      try {
        const ID = uuidv4();
        setIsLoadingUpdateTodo(true);
        dispatch(
          updateTodo({
            group: "todos",
            todo: {
              ...todo,
              subTasks: [...(todo.subTasks as TTodo[]), { ...task, id: ID }],
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

  const handleUpdateSubTask = useCallback(
    async (todo: TTodo, updatedTask: TTodo) => {
      try {
        setIsLoadingUpdateTodo(true);
        const updatedSubTasks = [...(todo.subTasks as TTodo[])].map(
          (subtask) => {
            if (subtask.id === updatedTask.id) {
              return updatedTask;
            }
            return subtask;
          }
        );
        dispatch(
          updateTodo({
            group: "todos",
            todo: {
              ...todo,
              subTasks: updatedSubTasks,
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

  const handleUpdateTodo = useCallback(
    async (updatedTodo: TTodo) => {
      try {
        setIsLoadingUpdateTodo(true);
        if (new Date().toDateString() === updatedTodo.dueDate) {
          updatedTodo.project = "Today";
        } else updatedTodo.project = "Tasks";
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
        subTasks: [] as TTodo[],
        labels: [] as string[],
        isCompleted: false,
        owner: user.uid,
        dueDate: new Date().toDateString(),
        priority: 4,
        project: "Today",
      });
    } else {
      setTodo({
        taskName: "",
        description: "",
        subTasks: [] as TTodo[],
        labels: [] as string[],
        isCompleted: false,
        owner: user.uid,
        dueDate: "",
        priority: 4,
        project: "Tasks",
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
      isShowAlert,
      setIsShowAlert,
      todo,
      setTodo,
      handleChangeTodo,
      selectedItem,
      setSelectedItem,
      handleAddSubTask,
      handleUpdateSubTask,
    };
  }, [
    handleAddTodo,
    handleUpdateTodo,
    handleCancelTodo,
    isLoadingAddTodo,
    isLoadingUpdateTodo,
    isShowAlert,
    setIsShowAlert,
    todo,
    setTodo,
    handleChangeTodo,
    selectedItem,
    setSelectedItem,
    handleAddSubTask,
    handleUpdateSubTask,
  ]);

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
