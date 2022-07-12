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
  console.log("daleeeeeeeeee",branchId,date)
  const AvailableGuards = await guardServices.getAvailableGuards(branchId,date);
  return AvailableGuards.data
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
    [getGuard.fulfilled]: (state, action) =>action.payload,
    [getGuard.pending]: (state) => {
      state.loading = true;
    },
    [getGuard.rejected]: (state, action) => {
      return { guard: [], loading: false, error: action.error };
    },
    [getAvailableGuards.fulfilled]: (state,action)=>{
      const AvailableGuards = action.payload
      return {AvailableGuards,loading:false,error:null}
    },
    [getAvailableGuards.pending]: (state) => {
      state.loading = true
    },
    [getAvailableGuards.rejected] : (state,action) => {
      return {AvailableGuards:[],loading:false,error:action.error}
    },

}
  
);

export default guardsReducer;
