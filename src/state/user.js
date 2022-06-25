import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendLoginRequest = createAsyncThunk("Login", async ({email,password}) => {
    return axios.post("api/login",{email,password});
});

const userReducer = createReducer(
  { loading: false, userInfo: {} , err:null},
  {
    [sendLoginRequest.fulfilled]: (state, action) =>{
      state.userInfo = action.payload.user
      state.loading = false
    },
    [sendLoginRequest.pending]: (state) => {
      state.loading = true;
    },
    [sendLoginRequest.rejected]: (state, action) => {
      state.loading = false;
      state.err=action.error.message
    },
  }
);

export default userReducer;
