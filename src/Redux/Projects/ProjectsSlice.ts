import { firebaseProvider } from "@/Firebase/provider";
import { TProject } from "@/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const projectNameCount: { [key: string]: number; } = {} as any;

const initialState: { projects: TProject[]; currentProject: TProject; status: string } = {
  projects: [],
  currentProject: {} as TProject,
  status: "idle",
};

export const projectsSlice = createSlice(
  {
    name: "projects",
    initialState: initialState,
    reducers: {

    },
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
        state.currentProject = action.payload;
        state.status = "idle";
      });
      builder.addCase(updateProject.rejected, (state, _) => {
        state.status = "rejected";
      });
      builder.addCase(addTodoIntoProject.pending, (state, _) => {
        state.status = "pending";
      });
      builder.addCase(addTodoIntoProject.fulfilled, (state, action) => {
        const updatedProjects = [...state.projects].map((project) => {
          if (project.id === action.payload.id) {
            return action.payload;
          }
          return project;
        })
        state.currentProject = action.payload;
        state.projects = updatedProjects;
        state.status = "idle";
      });
      builder.addCase(addTodoIntoProject.rejected, (state, _) => {
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
      builder.addCase(getCurrentProject.pending, (state, _) => {
        state.status = "pending";
      });
      builder.addCase(getCurrentProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        state.status = "idle";
      });
      builder.addCase(getCurrentProject.rejected, (state, _) => {
        state.status = "rejected";
      });
    }
  }
)

export const addProject = createAsyncThunk("projects/addProject", async (project: string) => {
  try {
    const docRef = await firebaseProvider.addNewDoc("projects", {
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
    await firebaseProvider.updateDoc("projects", temp);
    return updatedProject;
  } catch (error) {
    console.error(error);
    throw new Error("Can not update project");
  }
})

export const addTodoIntoProject = createAsyncThunk("projects/addTodoIntoProject", async (
  project: TProject,
) => {
  try {
    // Copy to new project to handle update
    const temp = JSON.parse(JSON.stringify(project));
    temp.createdAt = new Date(temp.createdAt);
    await firebaseProvider.updateDoc("projects", temp);
    return project;
  } catch (error) {
    console.error(error);
    throw new Error("Can not add todo into project");
  }
})


export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  try {
    const data = await firebaseProvider.fetchDocs("projects");
    const filteredData = data.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as TProject),
        // convert timestamp to date
        createdAt: doc.data().createdAt.toDate() as Date,
      }

    });
    return filteredData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  } catch (error) {
    console.error(error);
    throw new Error("Can not fetch projects");
  }
})

export const getCurrentProject = createAsyncThunk("projects/getCurrentProject", async (projectId: string) => {
  try {
    const data = await firebaseProvider.getDocById("projects", projectId) as TProject;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Can not fetch projects");
  }
})