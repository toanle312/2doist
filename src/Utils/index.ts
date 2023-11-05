export const PAGE_URL = {
  LOGIN: "/login",
  HOME: "/home",
}

export const NESTED_URL = {
  INBOX: "inbox",
  TODAY: "today",
  UPCOMING: "upcoming",
  FILTER_LABELS: "filter-labels"
}

export const TODO_PROPERTIES = {
  DUE_DATE: "dueDate",
  TASK_NAME: "taskName",
  PRIORITY: "priority",
  DESCRIPTION: "description",
  SUB_TASKS: "subtasks",
  LABELS: "labels"
}

export const TODO_PAGES = {
  TODAY: "Today",
  INBOX: "Inbox",
}

export const MODAL_TYPES = {
  ADD: "Add",
  SAVE: "Save",
}

export const DUEDATE_TYPES = {
  FULL: "Full",
  SHORT: "Short",
}

export const TODOITEM_TYPES = DUEDATE_TYPES;

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
export const getCurrentDayInWeek = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  return date.getDay();
};
