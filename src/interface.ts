export interface Account {
  id: string;
  fullname: string;
  avatar: string;
  email: string;
  isLogin: boolean;
}

export interface UserDTO {
  _id: string;
  fullName: string;
  email: string;
}

export interface CommentDTO {
  _id: string;
  content: string;
  avatar: string;
  createAt: Date;
}
export interface TodoDTO {
  taskName: string;
  description: string;
  dueDate: string;
  project?: string;
  comment?: Array<CommentDTO>;
  priority: number;
  subTask?: TodoDTO;
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

export enum Priority {
  "Priority" = 0,
  "P1" = 1,
  "P2" = 2,
  "P3" = 3,
  "P4" = 4
}

export type ShowDueDate = {
  color: string;
  text: string;
};

export type DateList = {
  id: string;
  icon: string;
  date: string;
  content: string;
  color: string;
};
