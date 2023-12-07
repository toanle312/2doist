import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { addTodo, updateTodo } from "@/Redux/Todos/TodosSlice";
import { TProject, TTodo } from "@/interface";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { TODO_PAGES } from "@/Utils";
import { v4 as uuidv4 } from "uuid";
import { addTodoIntoProject } from "@/Redux/Projects/ProjectsSlice";

type ContextValueProps = {
  handleAddTodo: () => Promise<void>;
  handleAddSubTask: (todo: TTodo, task: TTodo) => Promise<void>;
  handleUpdateSubTask: (todo: TTodo, task: TTodo) => Promise<void>;
  handleDeleteSubTask: (todo: TTodo, task: TTodo) => Promise<void>;
  handleUpdateTodo: (updatedTodo: TTodo) => Promise<void>;
  handleCancelTodo: (type?: string) => void;
  isLoadingAddTodo: boolean;
  isLoadingUpdateTodo: boolean;
  isLoadingDeleteTodo: boolean;
  todo: TTodo;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  handleChangeTodo: (name: string, value: any) => void;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  isShowAlert: boolean;
  setIsShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
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
    owner: user?.uid,
    project: "Tasks",
  });

  const [isLoadingAddTodo, setIsLoadingAddTodo] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [isLoadingUpdateTodo, setIsLoadingUpdateTodo] =
    useState<boolean>(false);
  const [isLoadingDeleteTodo, setIsLoadingDeleteTodo] =
    useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string>("");

  const dispatch = useAppDispatch();

  const projects = useAppSelector((state) => state.projects.projects);

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
      const addedTodo = await dispatch(
        addTodo({
          group: "todos",
          todo: {
            ...todo,
          } as TTodo,
        })
      ).unwrap();
      if (todo?.project !== "Tasks") {
        const projectChange = projects.find(
          (p) => p.id === todo.project
        ) as TProject;
        await dispatch(
          addTodoIntoProject({
            ...projectChange,
            todos: [...(projectChange.todos as any), addedTodo.id],
          })
        );
      }
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
        await dispatch(
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
        throw new Error("Can not add subtask");
      }
    },
    [dispatch]
  );

  const handleDeleteSubTask = useCallback(
    async (todo: TTodo, task: TTodo) => {
      try {
        setIsLoadingDeleteTodo(true);
        await dispatch(
          updateTodo({
            group: "todos",
            todo: {
              ...todo,
              subTasks: [...(todo.subTasks as TTodo[])].filter(
                (subTask) => subTask.id !== task.id
              ),
            },
          })
        ).unwrap();
        setIsLoadingDeleteTodo(false);
      } catch (error) {
        console.error(error);
        throw new Error("Can not delete subtask");
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
        await dispatch(
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
        await dispatch(
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
      setTodo((prev) => {
        return {
          taskName: "",
          description: "",
          subTasks: [] as TTodo[],
          labels: [] as string[],
          isCompleted: false,
          owner: user?.uid,
          dueDate: new Date().toDateString(),
          priority: 4,
          project: prev.project,
        };
      });
    } else {
      setTodo((prev) => {
        return {
          taskName: "",
          description: "",
          subTasks: [] as TTodo[],
          labels: [] as string[],
          isCompleted: false,
          owner: user?.uid,
          dueDate: "",
          priority: 4,
          project: prev.project,
        };
      });
    }
  }, []);

  const contextValue = useMemo(() => {
    return {
      handleAddTodo,
      handleUpdateTodo,
      handleCancelTodo,
      isLoadingAddTodo,
      setIsLoadingAddTodo,
      isLoadingUpdateTodo,
      isLoadingDeleteTodo,
      isShowAlert,
      setIsShowAlert,
      todo,
      setTodo,
      handleChangeTodo,
      selectedItem,
      setSelectedItem,
      handleAddSubTask,
      handleUpdateSubTask,
      handleDeleteSubTask,
    };
  }, [
    handleAddTodo,
    handleUpdateTodo,
    handleCancelTodo,
    isLoadingAddTodo,
    setIsLoadingAddTodo,
    isLoadingUpdateTodo,

    isLoadingDeleteTodo,
    isShowAlert,
    setIsShowAlert,
    todo,
    setTodo,
    handleChangeTodo,
    selectedItem,
    setSelectedItem,
    handleAddSubTask,
    handleUpdateSubTask,
    handleDeleteSubTask,
  ]);

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
