import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMailRecover = createAsyncThunk("SEND_MAIL_RECOVER", async (email) => {
    return axios.post("api/login",{email});
});

export const sendCodeRecover = createAsyncThunk("SEND_CODE_RECOVER", async (code,thunkAPI) => {
    const email = thunkAPI.getState().recover.data.email
    return axios.post("api/login",{email,code}); 
});

export const sendPasswordRecover = createAsyncThunk("SEND_PASSWORD_RECOVER", async (password,thunkAPI) => {
    const email = thunkAPI.getState().recover.data.email
    const code = thunkAPI.getState().recover.data.code
    return axios.post("api/login",{email,code,password});  
});

const recoverReducer = createReducer(
  { loading: false, data: {email:null,code:null} , error:null,success:null},
  {
    [sendMailRecover.fulfilled]: (state, action) =>{
        state.data.email = action.payload.data
        state.loading = false
        state.error = null
    },
    [sendMailRecover.pending]: (state) => {
        state.loading = true;
    },
    [sendMailRecover.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message
    },
    [sendCodeRecover.fulfilled]: (state, action) =>{
        state.data.code = action.payload
        state.loading = false
        state.error = null
    },
    [sendCodeRecover.pending]: (state) => {
        state.loading = true;
    },
    [sendCodeRecover.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    [sendPasswordRecover.fulfilled]: (state) =>{
        state.data.success = true
        state.loading = false
        state.error = null
        state.success = true
    },
    [sendPasswordRecover.pending]: (state) => {
      state.loading = true;
    },
    [sendPasswordRecover.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
    }

  }
);

export default recoverReducer;
