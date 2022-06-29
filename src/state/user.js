import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from '../services/userServices'

export const sendLoginRequest = createAsyncThunk("Login", async ({email,password}) => {
    return userServices.logIn(email,password);
});

const userReducer = createReducer(
  { loading: false, userInfo: {name:"Elon Musk",image:"https://www.cronista.com/files/image/335/335890/60ca12f9265e1.jpg",role:"Administrador"} , err: null},
  {
    [sendLoginRequest.fulfilled]: (state, action) =>{
      state.userInfo = action.payload.data
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
  }
);

export default userReducer;
