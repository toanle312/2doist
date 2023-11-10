import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/AuthSlice";
import { todosSlice } from "./Todos/TodosSlice";
import { projectsSlice } from "./Projects/ProjectsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    todos: todosSlice.reducer,
    projects: projectsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
