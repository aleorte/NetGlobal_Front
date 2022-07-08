import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import provinceServices from "../services/provinceServices";

export const getProvinces = createAsyncThunk("GET_PROVINCES", async () => {
  return provinceServices.getProvinces();
})

const provincesReducer = createReducer({loading:false,provinces:[],error:null,success:false},{
  [getProvinces.fulfilled]: (state,action)=>{
    const provinces = action.payload.data
    return {provinces,loading:false,error:null}
  },
  [getProvinces.pending]: (state) => {
    state.loading = true
  },
  [getProvinces.rejected] : (state,action) => {
    return {provinces:[],loading:false,error:action.error}
  },
});

export default provincesReducer;