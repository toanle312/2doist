import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebaseProvider } from "@/Firebase/provider";
import { TTodo } from "@/interface";
import { auth } from "@/Firebase/config";

const initialState: { todos: TTodo[]; currentSubTask: TTodo[]; currentTodo: TTodo; status: string } = {
  todos: [] as TTodo[],
  currentSubTask: [] as TTodo[],
  currentTodo: {} as TTodo,
  status: "Normal",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    getCurrentTodo: (state, action) => {
      state.currentTodo = [...state.todos].find(todo => todo.id === action.payload) as TTodo;
      state.status = "Normal";
    }
  },
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
        state.currentSubTask = action.payload.subTasks as TTodo[];
      })
      .addCase(addTodo.rejected, (state, _action) => {
        state.status = "Error";
      })
      .addCase(updateTodo.pending, (state, _action) => {
        state.status = "Loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = [...state.todos].map(todo => {
          if (todo?.id === action.payload?.id) {
            return action.payload;
          }
          return todo;
        })
        state.currentSubTask = action.payload.subTasks as TTodo[];
        state.currentTodo = action.payload;
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
      const docRef = await firebaseProvider.addDocs(group, todo);
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
    await firebaseProvider.updateDocs(group, todo);
    return todo;
  } catch (error) {
    console.error(error);
    throw new Error("Can not update todo");
  }
});

export const getTodos = createAsyncThunk("todos/getTodos", async (userId: string) => {
  try {
    const data = await firebaseProvider.fetchDocs("todos");
    const filteredData = data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as TTodo),
    }));
    return filteredData.filter((doc) => doc.owner === userId);
  } catch (error) {
    console.error(error);
    throw new Error("Can not fetch todos");
  }
});
