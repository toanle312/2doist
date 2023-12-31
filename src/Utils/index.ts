import { TTodo } from "@/interface";

export const PAGE_URL = {
  LOGIN: "/login",
  HOME: "/home",
};

export const NESTED_URL = {
  INBOX: "tasks",
  TODAY: "today",
  UPCOMING: "upcoming",
  FILTER_LABELS: "filter-labels",
};

export const TODO_PROPERTIES = {
  DUE_DATE: "dueDate",
  TASK_NAME: "taskName",
  PRIORITY: "priority",
  DESCRIPTION: "description",
  SUB_TASKS: "subtasks",
  LABELS: "labels",
  PROJECT: "project",
};

export const TODO_PAGES = {
  TODAY: "Today",
  TASKS: "Tasks",
  PROJECT: "Project",
  UPCOMING: "Upcoming",
};

export const MODAL_TYPES = {
  ADD: "Add",
  SAVE: "Save",
};

export const DUEDATE_TYPES = {
  FULL: "Full",
  SHORT: "Short",
};

export const TODOITEM_TYPES = DUEDATE_TYPES;

export const mappingTypeView = {
  Name: "taskName",
  "Date added": "createdAt",
  "Due date": "dueDate",
  Label: "label",
};

export const GROUPING_TYPE = {
  DEFAULT: "None (default)",
  DUEDATE: "Due date",
  DATE_ADDED: "Date added",
  PRIORITY: "Priority",
  LABEL: "Label",
};

export const SORTING_TYPE = {
  DEFAULT: "Manual (default)",
  DUEDATE: "Due date",
  DATE_ADDED: "Date added",
  PRIORITY: "Priority",
  LABEL: "Label",
};

export const getAllMonths = (
  from: number,
  to: number,
  currentMonth: number,
  year: number
) => {
  let months = [] as { m: number; y: number }[];

  while (from <= to) {
    months = [...months].concat(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
        return {
          m: month,
          y: from,
        };
      })
    );
    from = from + 1;
  }

  const filterMonths = months.filter(
    (d) => (d.m >= currentMonth && d.y === year) || d.y > year
  );
  return filterMonths;
};

/**
 *
 * @param year current year
 * @param month current month (0 - 11)
 * @returns number of days in month of year
 */
export const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month + 1, 0);

  if (!isNaN(date.getDate())) {
    return Array.from(Array(date?.getDate())?.keys());
  }
  return [];
};

/**
 *
 * @param year current year
 * @param month current month (0 - 11)
 * @param day current day
 * @returns day of the week of current day (0 - 6: SUN - MON - ... - SAT)
 */
export const getCurrentDayInWeek = (
  year: number,
  month: number,
  day: number
) => {
  const date = new Date(year, month, day);
  return date.getDay();
};

export const getTasksByDate = (todos: TTodo[], date: string) => {
  const tasks = todos.reduce((tasks, todo) => {
    if (todo.dueDate === date) {
      tasks.push(todo);
      return tasks;
    }
    return tasks;
  }, [] as TTodo[]);
  return tasks;
};

export const getTasksCountByDate = (todos: TTodo[], date: string) => {
  const tasksCount = todos.reduce((count, todo) => {
    if (todo.dueDate === date) {
      return count + 1;
    }
    return count;
  }, 0);
  return tasksCount;
};

export const sortTodoList = (
  todos: TTodo[],
  sortingType: string,
  direction: number
) => {
  return [...todos].sort((t1, t2) => {
    if (sortingType === "Name") {
      return (
        direction *
        t1.taskName
          .toLocaleLowerCase()
          .localeCompare(t2.taskName.toLocaleLowerCase())
      );
    }
    if (sortingType === "Due date") {
      if (t1.dueDate === "") return direction * -1;
      if (t2.dueDate === "") return direction * 1;
      return (
        direction *
        (new Date(t1.dueDate).getTime() - new Date(t2.dueDate).getTime())
      );
    }
    if (sortingType === "Date added") {
      if (t1.createdAt && t2.createdAt) {
        return direction * (t1.createdAt.getTime() - t2.createdAt.getTime());
      }
      return 0;
    }
    if (sortingType === "Priority") {
      return direction * (t1.priority - t2.priority);
    }
    return 0;
  });
};

export const groupTodoList = (
  todos: TTodo[],
  groupingType: string,
  sortingType: string,
  direction: number
) => {
  if (groupingType === "Due date") {
    const result: Record<string, Array<TTodo>> = {};
    for (const todo of todos) {
      if (result[todo.dueDate] === undefined) {
        result[todo.dueDate] = [todo];
      } else {
        result[todo.dueDate].push(todo);
      }
    }
    for (const date in result) {
      result[date] = sortTodoList(result[date], sortingType, direction);
    }
    return result;
  } else if (groupingType === "Date added") {
    const result: Record<string, Array<TTodo>> = {};
    for (const todo of todos) {
      if (result[todo.createdAt?.toDateString() as string] === undefined) {
        result[todo.createdAt?.toDateString() as string] = [todo];
      } else {
        result[todo.createdAt?.toDateString() as string].push(todo);
      }
    }
    for (const date in result) {
      result[date] = sortTodoList(result[date], sortingType, direction);
    }
    return result;
  } else if (groupingType === "Priority") {
    const result: Record<string, Array<TTodo>> = {};
    for (const todo of todos) {
      if (result["Priority " + todo.priority] === undefined) {
        result["Priority " + todo.priority] = [todo];
      } else {
        result["Priority " + todo.priority].push(todo);
      }
    }
    for (const date in result) {
      result[date] = sortTodoList(result[date], sortingType, direction);
    }
    return result;
  }
};
