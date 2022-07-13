import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import guardServices from "../services/guardServices";

export const getGuards = createAsyncThunk("GET_GUARDS", async () => {
  const guards = await guardServices.getGuards();
  return guards.data;
});


export const addGuard = createAsyncThunk("ADD_GUARDS", async (guard) => {
  return guardServices.addGuard(guard);
})

export const updateGuard = createAsyncThunk("UPDATE_GUARDS", async ({guardId,guardData}) => {
  return guardServices.updateGuard(guardId,guardData);
})

export const getGuard = createAsyncThunk("GET_GUARD", async (guardId) => {
  const guard = await guardServices.getGuard(guardId);
  return guard.data;
});

export const getAvailableGuards= createAsyncThunk("GET_AVAIBLEGUARDS", async ({branchId,date}) => {
  const AvailableGuards = await guardServices.getAvailableGuards(branchId,date);
  return AvailableGuards.data
})

const guardsReducer = createReducer({loading:false,guards:[],guard:{},error:null,success:false,actionType:""},{
  [getGuards.fulfilled]: (state,action)=>{
    const guards = action.payload.guards
    state.guards=guards
    state.loading=false
    state.error=false
  },
  [getGuards.pending]: (state) => {
    state.loading = true
  },
  [getGuards.rejected] : (state,action) => {
    state.loading=false
    state.error=action.error
  },
  [addGuard.fulfilled]: (state,action)=>{
    state.actionType = "add"
    state.loading = false
    state.error = false
    state.success = true
  },
  [addGuard.pending]: (state) => {
    state.loading = true
  },
  [addGuard.rejected] : (state,action) => {
    state.error = action.error
    state.loading = false
    state.success = false
  },
  [updateGuard.fulfilled]: (state,action)=>{
    state.actionType = "update"
    state.loading = false
    state.error = false
    state.success = true
  },
  [updateGuard.pending]: (state) => {
    state.loading = true
  },
  [updateGuard.rejected] : (state,action) => {
    state.error = action.error
    state.loading = false
    state.success = false
  },
    [getGuard.fulfilled]: (state, action) =>{
      state.guard=action.payload
      state.loading = false
    state.error = false},

    [getGuard.pending]: (state) => {
      state.loading = true;
    },
    [getGuard.rejected]: (state, action) => {
      state.loading=false
      state.error=action.error
    },
    [getAvailableGuards.fulfilled]: (state,action)=>{
      const AvailableGuards = action.payload
      state.guards=AvailableGuards
      state.loading=false
      state.error=false
     
    },
    [getAvailableGuards.pending]: (state) => {
      state.loading = true
    },
    [getAvailableGuards.rejected] : (state,action) => {
      state.loading=false
      state.error=action.error
    },

}
  
);

export default guardsReducer;
