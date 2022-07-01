import { createReducer, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import userServices from '../services/userServices'

export const sendLoginRequest = createAsyncThunk("Login", async ({email,password}) => {
  return userServices.logIn(email,password)  
});

export const logout = createAction("LOGOUT")

const userReducer = createReducer(
  { loading: false, userInfo: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {} , err: null},
  {
    [sendLoginRequest.fulfilled]: (state, action) =>{
      localStorage.setItem("user",JSON.stringify(action.payload.data))
      state.userInfo = action?.payload?.data
      state.loading = false
      state.error = null
    },
    [sendLoginRequest.pending]: (state) => {
      state.loading = true;
    },
    [sendLoginRequest.rejected]: (state, action) => {
      state.loading = false;
      state.err = action.error
    },
    [logout]: (state,action) =>{
      localStorage.removeItem("user")
      state.userInfo = {}
    }
  }
);

export default userReducer;
