import { createReducer , createAction } from "@reduxjs/toolkit";

export const setAlert = createAction("SET_ALERT")
export const closeAlert = createAction("CLOSE_ALERT")

const alertReducer = createReducer(
  { open: false, severity: "" , message:""},
  {
    [setAlert] : (state,action) => {
        console.log(action.payload)
        state.open = true
        state.severity = action.payload.severity
        state.message = action.payload.message
    },
    [closeAlert] : (state,action) => {
        state.open = false
    }
  }
);

export default alertReducer;