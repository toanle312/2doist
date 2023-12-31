import { TTodo } from "@/interface";

export const todoListSelector = (state: any): TTodo[] => {
  return state.todos.todos;
};
