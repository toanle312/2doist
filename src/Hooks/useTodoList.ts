import { TProject, TTodo } from "@/interface";
import { useAppSelector } from ".";
import { todoListSelector } from "@/Redux/selector";
import { TODO_PAGES, groupTodoList, sortTodoList } from "@/Utils";
import { useMemo } from "react";

const useTodoList = (
  page: string,
  currentProject: TProject | undefined,
  sortingType: string,
  direction: number,
  groupingType: string,
  initTodoList?: TTodo[]
) => {
  let todos = useAppSelector(todoListSelector).filter((todo) => {
    if (page === TODO_PAGES.TODAY) {
      return todo.dueDate === new Date().toDateString();
    } else if (page === TODO_PAGES.PROJECT) {
      return todo.project === currentProject?.id;
    } else return todo.project === TODO_PAGES.TASKS;
  });

  if (initTodoList !== undefined) {
    todos = [...initTodoList];
  }

  const groupingTodoList = useMemo(() => {
    return groupTodoList(todos, groupingType, sortingType, direction);
  }, [todos, groupingType, sortingType, direction]);

  const filterTodoList = useMemo(() => {
    return sortTodoList(todos, sortingType, direction);
  }, [todos, sortingType, direction]);

  const overDueTodoList = useMemo(() => {
    return filterTodoList.filter((todo) => {
      const dueDate = new Date(todo.dueDate);
      const today = new Date();
      return (
        dueDate.toDateString() !== today.toDateString() &&
        dueDate.getTime() < today.getTime()
      );
    });
  }, [todos]);

  const completedTodoList = useMemo(() => {
    return filterTodoList.filter((todo) => {
      return todo.isCompleted;
    });
  }, [todos]);

  const uncompletedTodoList = useMemo(() => {
    return filterTodoList.filter((todo) => {
      return !todo.isCompleted;
    });
  }, [todos]);

  return {
    overDueTodoList,
    completedTodoList,
    uncompletedTodoList,
    filterTodoList,
    groupingTodoList,
  };
};

export default useTodoList;
