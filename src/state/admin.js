import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import adminServices from "../services/adminServices";

export const getAdmins = createAsyncThunk("GET_ADMINS", async () => {
  const admins = await adminServices.getAdmins();
  return admins.data
})

const adminReducer = createReducer({loading:false,admins:[],error:null},{
    [getAdmins.fulfilled]: (state,action)=>{
        const admins = action.payload.admins
        return {admins,loading:false,error:null}
    },
    [getAdmins.pending]: (state) => {
        state.loading = true
    },
    [getAdmins.rejected] : (state,action) => {
        return {admins:[],loading:false,error:action.error}
    },
}
  
);

export default adminReducer;