import { createReducer, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import AssignamentServices from '../services/assignamentServices'

export const getAssignamentsBranch = createAsyncThunk("GET_ASSIGNAMENTSBRANCH", async () => {
    const assignamentsBranch = await AssignamentServices.getAssignamentsBranch();
    return assignamentsBranch.data
  })

  export const getMonthAssignamentsGuard = createAsyncThunk("GET_MONTHASSIGNAMENTSGUARD", async () => {
    const assignamentsGuard = await AssignamentServices.getMonthAssignamentsGuard();
    return assignamentsGuard.data
  })


  export const addAssignamentsGuard = createAsyncThunk("ADD_ASSIGNAMENTGUARD", async (assignament) => {
    return AssignamentServices.addAssignamentsGuard(assignament);
  })


const assignamentReducer=createReducer({loading:false,assignamentsBranch:[],error:null},{
    [getAssignamentsBranch.fulfilled]: (state,action)=>{
      const assignamentsBranch = action.payload.assignamentsBranch
      return {assignamentsBranch,selectedAssignamentBranch:AssignamentServices[0]||{},loading:false,error:null}
    },
    [getAssignamentsBranch.pending]: (state) => {
      state.loading = true
    },
    [getAssignamentsBranch.rejected] : (state,action) => {
      return {assignamentsBranch:[],selectedAssignamentBranch:{},loading:false,error:action.error}
    },
    [addAssignamentsGuard.fulfilled] : (state,action) => {
      const assignaments = [...state.assignaments,action.meta.arg.company]
      return {assignaments,selectedAssignament:assignaments[0]||{},loading:false,error:null}
    },
    [addAssignamentsGuard.pending]: (state) => {
      state.loading = true
    },
    [addAssignamentsGuard.rejected] : (state,action) => {
      state.error = action.error
      state.loading = false
    },
    [getMonthAssignamentsGuard.fulfilled] : (state,action) => {
        const assignamentsGuard = [...state.assignamentsGuard,action.meta.arg.company]
        return {assignamentsGuard,selectedAssignament:assignamentsGuard[0]||{},loading:false,error:null}
      },
      [getMonthAssignamentsGuard.pending]: (state) => {
        state.loading = true
      },
      [getMonthAssignamentsGuard.rejected] : (state,action) => {
        state.error = action.error
        state.loading = false
      },
}
  
);

export default assignamentReducer;