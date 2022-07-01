import { createReducer, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userServices from "../services/userServices";

export const sendMailRecover = createAsyncThunk("SEND_MAIL_RECOVER", async (email) => {
    return userServices.sendMailRecover(email)
});

export const sendCodeRecover = createAsyncThunk("SEND_CODE_RECOVER", async (code,thunkAPI) => {
    const email = thunkAPI.getState().recover.data.email
    return userServices.sendCodeRecover(email,code) 
});

export const sendPasswordRecover = createAsyncThunk("SEND_PASSWORD_RECOVER", async (password,thunkAPI) => {
    const email = thunkAPI.getState().recover.data.email
    const code = thunkAPI.getState().recover.data.code
    return userServices.sendPasswordRecover(email,code,password)  
});

export const restart = createAction("RESTART")

const recoverReducer = createReducer(
  { loading: false, data: {email:null,code:null,user:null} , error:null,success:null},
  {
    [sendMailRecover.fulfilled]: (state, action) =>{
        state.data.email = action.meta.arg
        state.loading = false
        state.error = null
        state.data.user = action.payload.data
    },
    [sendMailRecover.pending]: (state) => {
        state.loading = true;
    },
    [sendMailRecover.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error
    },
    [sendCodeRecover.fulfilled]: (state, action) =>{
        state.data.code = action.meta.arg
        state.loading = false
        state.error = null
    },
    [sendCodeRecover.pending]: (state) => {
        state.loading = true;
    },
    [sendCodeRecover.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error
    },
    [sendPasswordRecover.fulfilled]: (state) =>{
        state.loading = false
        state.error = null
        state.success = true
    },
    [sendPasswordRecover.pending]: (state) => {
      state.loading = true;
    },
    [sendPasswordRecover.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error
    },
    [restart] : () => {
        return { loading: false, data: {email:null,code:null,user:null} , error:null,success:null}
    }

  }
);

export default recoverReducer;
