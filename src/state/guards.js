import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import guardServices from "../services/guardServices";

export const getGuards = createAsyncThunk("GET_GUARDS", async () => {
  const guards = await guardServices.getGuards();
  return guards.data
})

export const addGuard = createAsyncThunk("ADD_GUARDS", async (guard) => {
  return guardServices.addGuard(guard);
})

const guardsReducer = createReducer({loading:false,guards:[],error:null,success:false,actionType:""},{
  [getGuards.fulfilled]: (state,action)=>{
    const guards = action.payload.guards
    return {guards,loading:false,error:null}
  },
  [getGuards.pending]: (state) => {
    state.loading = true
  },
  [getGuards.rejected] : (state,action) => {
    return {guards:[],loading:false,error:action.error}
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
}
  
);

export default guardsReducer;