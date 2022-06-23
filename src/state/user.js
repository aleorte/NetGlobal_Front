import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendLoginRequest = createAsyncThunk("Login", async () => {
  try {
    const user = await axios.post("api/login");
    return user
  } catch (err) {
    return err.message;
  }
});

const userReducer = createReducer(
  { loading: false, user: {} , err:null},
  {
    [sendLoginRequest.fulfilled]: (state, action) =>
      {state.user = action.payload
        state.loading = false},
    [sendLoginRequest.pending]: (state) => {
      state.loading = true;
    },
    [sendLoginRequest.rejected]: (state, action) => {
      state.loading = false;
      state.err=action.payload
    },
  }
);

export default userReducer;
