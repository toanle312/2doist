export interface Account {
  id: string;
  fullname: string;
  avatar: string;
  email: string;
  isLogin: boolean;
}

export interface TUser {
  _id: string;
  fullName: string;
  email: string;
}

export interface TComment {
  _id: string;
  content: string;
  avatar: string;
  createAt: Date;
}
export interface TTodo {
  id?: string;
  taskName: string;
  description: string;
  dueDate: string;
  isCompleted?: boolean;
  project?: string;
  comment?: Array<TComment>;
  priority: number;
  subTasks?: TTodo[];
}

export interface TSubTask {
  id?: string;
  todoID: string;
  tasks: TTodo[];
}

export enum MonthShortHand {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

export enum DaysInWeek {
  Sun,
  Mon,
  Tue,
  Wed,
  Thurs,
  Fri,
  Sat,
}

export enum EPriority {
  "P1" = 1,
  "P2" = 2,
  "P3" = 3,
  "Priority" = 4
}

export type TShowDueDate = {
  color: string;
  text: string;
};

export type TDateList = {
  id: string;
  icon: string;
  date: string;
  content: string;
  color: string;
};
