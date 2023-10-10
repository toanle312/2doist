import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebaseProvider } from "src/firebase/provider";
import { TTodo } from "src/interface";


const initialState: { todos: TTodo[]; status: string } = {
  todos: [] as TTodo[],
  status: "Normal",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, _action) => {
        state.status = "Loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, _action) => {
        state.status = "Error";
      })
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
  todo: TTodo;
};

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ group, todo }: addTodoType) => {
    try {
      const docRef = await firebaseProvider.addTodo(group, todo);
      return {
        id: docRef.id,
        ...todo
      };
    } catch (error) {
      console.error(error);
      throw new Error("Can not add todo");
    }
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async () => {
    try {
      const data = await firebaseProvider.fetchTodos("todos");
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() as TTodo,
      }));
      return filteredData;
    } catch (error) {
      console.error(error);
      throw new Error("Can not fetch todos");
    }
  }
);
