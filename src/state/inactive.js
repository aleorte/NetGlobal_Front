import { createReducer , createAction,createAsyncThunk } from "@reduxjs/toolkit";
import inactiveServices from "../services/inactiveServices";

const dataInactives = [
    {id:1,guard:{id:1,name:"Crespo Rodrigo"},description:"Visita medica",startDate:"14-11-2022",endDate:"19-11-2022"},
    {id:2,guard:{id:2,name:"Algun fulano"},description:"Problemas personales",startDate:"18-12-2022",endDate:"24-12-2022"},
    {id:3,guard:{id:2,name:"Otro mengano"},description:"Viaje al exterior",startDate:"04-12-2022",endDate:"08-12-2022"}
]

export const getPending = createAsyncThunk("GET_INACTIVES", async () => {
    return inactiveServices.getPending();
})

export const getPast = createAsyncThunk("GET_PAST", async () => {
    return inactiveServices.getPast();
})

export const setInactive = createAsyncThunk("SET_INACTIVE", async ({inactiveId,state}) => {
    return inactiveServices.setInactive(inactiveId,state);
})

export const getGuardInactives= createAsyncThunk("GET_INACTIVE", async (inactiveId) => {
    return inactiveServices.getGuardInactives(inactiveId);
})

const inactiveReducer = createReducer(
  { pending: [], past:[],guardInactives:[],loading:false, error:null },
  {
    [getPending.fulfilled] : (state,action) => {
        state.pending = action.payload.data
        state.loading = false
        state.error = false
    },
    [getPending.pending] : (state,action) => {
        state.loading = true
    },
    [getPending.rejected] : (state,action) => {
        state.loading = false
        state.error = action.error
    },
    [getPast.fulfilled] : (state,action) => {
        state.past = [...action.payload.data.approved,...action.payload.data.rejected].sort(function (a, b) {
            if (a.updatedAt < b.updatedAt) {
              return 1;
            }
            if (a.updatedAt > b.updatedAt) {
              return -1;
            }
            return 0;
        })
        state.loading = false
        state.error = false
    },
    [getPast.pending] : (state,action) => {
        state.loading = true
    },
    [getPast.rejected] : (state,action) => {
        state.loading = false
        state.error = action.error
    },
    [setInactive.fulfilled] : (state,action) => {
        state.pending = state.pending.filter(inactive => inactive.id!==action.meta.arg.inactiveId)
    },

    [getGuardInactives.fulfilled]:(state,action)=>{
        state.guardInactives=action.payload
    }

    /* [getInactives.fulfilled] : (state,action) => {
        state.inactives = action.payload
        state.loading = false
        state.error = null
    },
    [getInactives.pending] : (state,action) => {
        state.loading = true
    },
    [getInactives.rejected] : (state,action) => {
        state.inactives = []
        state.loading = false
        state.error = action.error
    }, */

  }
);

export default inactiveReducer;