import { auth } from "../../firebase/config";
import { Account } from "../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { create } from "domain";
import { AuthProvider, User, signInWithPopup } from "firebase/auth";

const initialState: { status: string; account: User } = {
  status: "",
  account: {} as User
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => {
      console.log(1);
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.account = action.payload as User;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.account = action.payload as User;
      })
  },
});

export const loginUser = createAsyncThunk("auth/login", async (provider: AuthProvider, thunkAPI) => {
  try{
    const userData = await signInWithPopup(auth, provider);
    return userData.user;
  }catch(err: any){
    message.error(err);
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () =>{
  try{
    auth.signOut();
    console.log(1); 
    return {};
  }catch(err: any){
    message.error(err);
  }
})

export default authSlice;