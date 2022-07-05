import { createReducer, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import companyServices from "../services/companyServices";

export const getCompanies = createAsyncThunk("GET_COMPANIES", async () => {
  const companies = await companyServices.getCompanies();
  return companies.data
})

export const addCompany = createAsyncThunk("ADD_COMPANY", async (company) => {
  return companyServices.addCompany(company);
})

export const restart = createAction("RESTART")

const companyReducer = createReducer({loading:false,companies:[],error:null,success:false},{
    [getCompanies.fulfilled]: (state,action)=>{
      const companies = action.payload.companies
      return {companies,loading:false,error:null}
    },
    [getCompanies.pending]: (state) => {
      state.loading = true
    },
    [getCompanies.rejected] : (state,action) => {
      return {companies:[],loading:false,error:action.error}
    },
    [addCompany.fulfilled] : (state,action) => {
      state.loading=false
      state.error=null
      state.success=true
    },
    [addCompany.pending]: (state) => {
      state.loading = true
    },
    [addCompany.rejected] : (state,action) => {
      state.error = action.error
      state.loading = false
      state.success = false
    },
    [restart]: (state) => {
      state.loading = false
      state.error = null
      state.success = false 
    }
}
  
);

export default companyReducer;