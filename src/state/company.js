import { createReducer, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import companyServices from "../services/companyServices";

export const getCompanies = createAsyncThunk("GET_COMPANIES", async () => {
  const companies = await companyServices.getCompanies();
  return companies.data
})

export const addCompany = createAsyncThunk("ADD_COMPANY", async (company) => {
  return companyServices.addCompany(company);
})

export const agregarCompany= createAction("Agregar_Company")

const companyReducer = createReducer({loading:false,companies:[],error:null},{
    [getCompanies.fulfilled]: (state,action)=>{
      const companies = action.payload.companies
      return {companies,selectedCompany:companies[0]||{},loading:false,error:null}
    },
    [getCompanies.pending]: (state) => {
      state.loading = true
    },
    [getCompanies.rejected] : (state,action) => {
      return {companies:[],selectedCompany:{},loading:false,error:action.error}
    },
    [addCompany.fulfilled] : (state,action) => {
      const companies = [...state.companies,action.meta.arg.company]
      return {companies,selectedCompany:companies[0]||{},loading:false,error:null}
    },
    [addCompany.pending]: (state) => {
      state.loading = true
    },
    [getCompanies.rejected] : (state,action) => {
      state.error = action.error
      state.loading = false
    },
    [agregarCompany]:(state,action) => {
      state.companies.push(action.payload)
    },
}
  
);

export default companyReducer;