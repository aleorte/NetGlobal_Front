import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const sendLoginRequest= createAsyncThunk("Login",()=>{
    return axios.post("api/login").then(res=>res.data)
});

const userReducer= createReducer({},{
    [sendLoginRequest.fulfilled]:(state,action)=>action.payload
})

export default userReducer