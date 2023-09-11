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
  _id: string;
  task: string;
  description: string;
  dueDate: Date;
  project: string;
  comment: Array<CommentDTO>;
  priority: number;
  subTask: TodoDTO;
}

export enum MonthShortHand{
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