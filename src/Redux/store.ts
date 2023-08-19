import { configureStore } from "@reduxjs/toolkit";

// import { legacy_createStore as createStore} from 'redux'

import authSlice from "./Auth/AuthSlice";

// const store = createStore(rootReducer);

// Sử dụng redux toolkit, tạo store với reducer trực tiếp không cần thông qua file reducer
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
