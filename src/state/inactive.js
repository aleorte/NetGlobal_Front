import { createReducer , createAction } from "@reduxjs/toolkit";

const dataInactives = [
    {id:1,guard:{id:1,name:"Crespo Rodrigo"},description:"Visita medica",startDate:"14-11-2022",endDate:"19-11-2022"},
    {id:2,guard:{id:2,name:"Algun fulano"},description:"Problemas personales",startDate:"18-12-2022",endDate:"24-12-2022"},
    {id:3,guard:{id:2,name:"Otro mengano"},description:"Viaje al exterior",startDate:"04-12-2022",endDate:"08-12-2022"}
]

export const getInactives = createAction("GET_INACTIVES")
export const setInactive = createAction("SET_INACTIVE")

const inactiveReducer = createReducer(
  { inactives: dataInactives, loading:false, error:null },
  {
    [setInactive] : (state,action) => {
        const id = action.payload.guard.id
        const result = action.payload.result
        console.log(result)
        state.inactives = state.inactives.filter(inactive => inactive.id!==id)
    },
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