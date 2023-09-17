import { createContext, useState } from "react";

export const TodoContext = createContext<any>(null);

type ShowDueDate = {
  color: string;
  text: string;
}

const TodoProvider = ({ children }: any) => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("Priority");
  const [dueDate, setDueDate] = useState<string>("");
  const [showDueDate, setShowDueDate] = useState<ShowDueDate>({
    color: "",
    text: "Due Date",
  });
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
        setShowDueDate
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
