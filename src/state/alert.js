import { createReducer , createAction } from "@reduxjs/toolkit";

export const setAlert = createAction("SET_ALERT")
export const closeAlert = createAction("CLOSE_ALERT")

const alertReducer = createReducer(
  { open: false, severity: "success" , message:""},
  {
    [setAlert] : (state,action) => {
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