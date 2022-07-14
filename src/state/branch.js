import { createReducer, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import branchServices from "../services/branchServices";

export const getBranches = createAsyncThunk("GET_BRANCHES", async (companyId) => {
  const branches = await branchServices.getBranches(companyId);
  return branches.data
})
export const getBranch = createAsyncThunk("GET_BRANCH", async (branchId) => {
  const branch = await branchServices.getBranch(branchId);
  return branch.data
})

export const getAvailableGuards = createAsyncThunk("GET_GUARDS", async (branchId) => {
  const branch = await branchServices.getAvailableGuards(branchId);
  return branch.data
})

export const addBranch = createAsyncThunk("ADD_BRANCH", async ({companyId,branch}) => {
  return branchServices.addBranch(companyId,branch);
})

export const updateBranch = createAsyncThunk("UPDATE_BRANCH", async ({branchId,branchData}) => {
  return branchServices.updateBranch(branchId,branchData);
})

export const restart = createAction("RESTART")

const branchReducer = createReducer({loading:false,branches:[],branch:{},error:null,success:false,actionType:"",guards:[]},{
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
    [getBranch.fulfilled]: (state,action)=>{state.branch= action.payload},

    [addBranch.fulfilled]: (state,action)=>{
      state.success = true
      state.loading = false
      state.error = false
      state.actionType = "add"
    },
    [addBranch.pending]: (state) => {
      state.loading = true
    },
    [addBranch.rejected] : (state,action) => {
      state.error = action.error
      state.loading = false
      state.success = false
    },
    [updateBranch.fulfilled]: (state,action)=>{
      state.success = true
      state.loading = false
      state.error = false
      state.actionType = "update"
    },
    [updateBranch.pending]: (state) => {
      state.loading = true
    },
    [updateBranch.rejected] : (state,action) => {
      state.error = action.error
      state.loading = false
      state.success = false
    },
    [getAvailableGuards.fulfilled]: (state,action)=>{
      state.guards= action.payload
    },
});

export default branchReducer;