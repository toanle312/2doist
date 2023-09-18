import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebaseProvider } from "src/firebase/provider";
import { TodoDTO } from "src/interface";

const initialState: { todos: TodoDTO[]; status: string } = {
  todos: [] as TodoDTO[],
  status: "Loading",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state, _action) => {
        state.status = "Loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, _action) => {
        state.status = "Error";
      });
  },
});

type addTodoType = {
  group: string;
  todo: TodoDTO;
};

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ group, todo }: addTodoType) => {
    try {
      await firebaseProvider.addTodo(group, todo);
      return todo;
    } catch (error) {
      console.error(error);
      throw new Error("Can not add todo");
    }
  }
);
