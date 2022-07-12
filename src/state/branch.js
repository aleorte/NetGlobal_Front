import { createReducer, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import branchServices from "../services/branchServices";

export const getBranches = createAsyncThunk("GET_BRANCHES", async (companyId) => {
  const branches = await branchServices.getBranches(companyId);
  return branches.data
})


export const restart = createAction("RESTART")

const branchReducer = createReducer({loading:false,branches:[],error:null,success:false,actionType:""},{
    [getBranches.fulfilled]: (state,action)=>{
      const branches = action.payload
      return {branches,loading:false,error:null,actionType:"get"}
    },
    [getBranches.pending]: (state) => {
      state.loading = true
    },
    [getBranches.rejected] : (state,action) => {
      return {branches:[],loading:false,error:action.error}
    },
});

export default branchReducer;