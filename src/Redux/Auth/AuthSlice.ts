import { auth } from "../../firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { AuthProvider, User, signInWithPopup } from "firebase/auth";

const initialState: { isLoading: boolean; account: User } = {
  isLoading: false,
  account: JSON.parse(localStorage.getItem("user") as string),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => {
      return {
        isLoading: false,
        account: {} as User,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.account = action?.payload as User;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = true;
        state.account = {} as User;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.account = action.payload as User;
      });
  },
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (provider: AuthProvider, thunkAPI) => {
    try {
      const userData = await signInWithPopup(auth, provider);
      localStorage.setItem("user", JSON.stringify(userData.user));
      return userData.user;
    } catch (error: any) {
      message.error(`Login ${error.response.data.message}`);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("user");
    auth.signOut();
    return {};
  } catch (err: any) {
    message.error(err);
  }
});

export default authSlice;
