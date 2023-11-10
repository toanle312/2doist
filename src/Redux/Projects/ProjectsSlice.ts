import { firebaseProvider } from "@/Firebase/provider";
import { TProject } from "@/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState: { projects: TProject[]; status: string } = {
  projects: [],
  status: "idle",
};

export const projectsSlice = createSlice(
  {
    name: "projects",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(addProject.pending, (state, _) => {
        state.status = "pending";
      });
      builder.addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.status = "idle";
      });
      builder.addCase(addProject.rejected, (state, _) => {
        state.status = "rejected";
      });
      builder.addCase(updateProject.pending, (state, _) => {
        state.status = "pending";
      });
      builder.addCase(updateProject.fulfilled, (state, action) => {
        const updatedProjects = [...state.projects].map((project) => {
          if (project.id === action.payload.id) {
            return action.payload;
          }
          return project;
        })
        state.projects = updatedProjects;
        state.status = "idle";
      });
      builder.addCase(updateProject.rejected, (state, _) => {
        state.status = "rejected";
      });
      builder.addCase(fetchProjects.pending, (state, _) => {
        state.status = "pending";
      });
      builder.addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = "idle";
      });
      builder.addCase(fetchProjects.rejected, (state, _) => {
        state.status = "rejected";
      });
    }
  }
)

export const addProject = createAsyncThunk("projects/addProject", async (project: string) => {
  try {
    const docRef = await firebaseProvider.addDocs("projects", {
      projectName: project,
      todos: [],
      createdAt: new Date(),
    });
    return {
      id: docRef.id,
      projectName: project,
      todos: [],
      createdAt: new Date(),
      isNew: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Can not add project");
  }
})

export const updateProject = createAsyncThunk("projects/updateProject", async (updatedProject: TProject) => {
  try {
    // Copy to new project to handle update
    const temp = JSON.parse(JSON.stringify(updatedProject));
    // convert date string to date object (after copy date object will be converted to date string)
    temp.createdAt = new Date(temp.createdAt);
    await firebaseProvider.updateDocs("projects", temp);
    return updatedProject;
  } catch (error) {
    console.error(error);
    throw new Error("Can not update project");
  }
})

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  try {
    const data = await firebaseProvider.fetchDocs("projects");
    const filteredData = data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as TProject),
      // convert timestamp to date
      createdAt: doc.data().createdAt.toDate() as Date,
    }));
    return filteredData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  } catch (error) {
    console.error(error);
    throw new Error("Can not add todo");
  }
})