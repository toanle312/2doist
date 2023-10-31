import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebaseProvider } from "@/Firebase/provider";
import { TTodo } from "@/interface";

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
      })
      .addCase(updateTodo.pending, (state, _action) => {
        state.status = "Loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = [...state.todos].map(todo => {
          if(todo?.id === action.payload?.id){
            return action.payload;
          }
          return todo;
        })
      })
      .addCase(updateTodo.rejected, (state, _action) => {
        state.status = "Error";
      });
  },
});

type addTodoType = {
  group: string;
  todo: TTodo;
};

type updateTodoType = addTodoType;

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ group, todo }: addTodoType) => {
    try {
      const docRef = await firebaseProvider.addTodo(group, todo);
      return {
        id: docRef.id,
        ...todo,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Can not add todo");
    }
  }
);

export const updateTodo = createAsyncThunk("todos/updateTodo", async ({ group, todo }: updateTodoType) => {
  try {
    await firebaseProvider.updateTodo(group, todo);
    return todo;
  } catch (error) {
    console.error(error);
    throw new Error("Can not update todo");
  }
});

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  try {
    const data = await firebaseProvider.fetchTodos("todos");
    const filteredData = data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as TTodo),
    }));
    return filteredData;
  } catch (error) {
    console.error(error);
    throw new Error("Can not fetch todos");
  }
});
