import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebaseProvider } from "@/Firebase/provider";
import { TSubTask, TTodo } from "@/interface";

const initialState: { subTask: TSubTask; status: string } = {
  subTask: {
    id: "",
    todoID: "",
    tasks: [] as TTodo[]
  },
  status: "Normal",
};

// manage all of subtasks of specific todo
export const subTaskSlice = createSlice({
  name: "subTask",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubTasks.pending, (state, _action) => {
        state.status = "Loading";
      })
      .addCase(getSubTasks.fulfilled, (state, action) => {
        state.subTask = action.payload;
      })
      .addCase(getSubTasks.rejected, (state, _action) => {
        state.status = "Error";
      })
      .addCase(updateSubTask.pending, (state, _action) => {
        state.status = "Loading";
      })
      .addCase(updateSubTask.fulfilled, (state, action) => {
        state.subTask = action.payload;
      })
      .addCase(updateSubTask.rejected, (state, _action) => {
        state.status = "Error";
      });
  },
});

type updateSubTaskType = {
  group: string;
  subTask: TSubTask;
};


export const updateSubTask = createAsyncThunk(
  "subTask/updateSubTask",
  async ({ group, subTask }: updateSubTaskType) => {
    console.log(subTask)
    try {
      await firebaseProvider.updateDocs(group, subTask);
      return subTask;
    } catch (error) {
      console.error(error);
      throw new Error("Can not update subtask");
    }
  }
);

export const getSubTasks = createAsyncThunk("subTask/getSubTasks", async (todoID: string) => {
  try {
    const data = await firebaseProvider.fetchDocs("subTasks");

    const filteredData = data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as TSubTask),
    }));
    const result = filteredData.find(task => task.todoID === todoID) as TSubTask;
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Can not fetch subTasks");
  }
});
