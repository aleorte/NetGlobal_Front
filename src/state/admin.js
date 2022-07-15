import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import adminServices from "../services/adminServices";

export const getAdmins = createAsyncThunk("GET_ADMINS", async () => {
  const admins = await adminServices.getAdmins();
  return admins.data
})

export const addAdmin = createAsyncThunk("ADD_ADMIN", async (admin,{ rejectWithValue }) => {
    try{
        const { data } = await adminServices.addAdmin(admin);
        return data
    }catch(e){
        return rejectWithValue(e.response.data)
    }
})
  
export const updateAdmin = createAsyncThunk("UPDATE_ADMIN", async ({adminId,adminData},{ rejectWithValue }) => {
    try{
        const { data } = await adminServices.updateAdmin(adminId,adminData);
        return data
    }catch(e){
        return rejectWithValue(e.response.data)
    }
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
    [addAdmin.fulfilled]: (state,action)=>{
        state.actionType = "add"
        state.loading = false
        state.error = false
        state.success = true
      },
    [addAdmin.pending]: (state) => {
        state.loading = true
    },
    [addAdmin.rejected] : (state,action) => {
        state.error = action.error
        state.loading = false
        state.success = false
    },
    [updateAdmin.fulfilled]: (state,action)=>{
        state.actionType = "update"
        state.loading = false
        state.error = false
        state.success = true
      },
    [updateAdmin.pending]: (state) => {
        state.loading = true
    },
    [updateAdmin.rejected] : (state,action) => {
        state.error = action.error
        state.loading = false
        state.success = false
    },

}
  
);

export default adminReducer;