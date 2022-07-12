import React, { useEffect } from "react";
import CompanyCard from "./CompanyCard";
import CompanyCells from "./CompanyCells";
import companyHeaders from "./CompanyHeaders";
import { useSelector,useDispatch } from "react-redux";
import { getCompanies } from "../../state/company";
import Dashboard from "../../commons/Dashboard";


const Companies = () => {

  const dispatch = useDispatch()
  const { companies } = useSelector(state=>state.company)
  
  useEffect(()=>{
    dispatch(getCompanies())
  },[])

  const companyData = {
    data: companies ,
    headers:companyHeaders, 
    Card:CompanyCard, 
    Cells:CompanyCells,
    label:"Compañias",
  }

  return (
    <Dashboard {...companyData}/>
  )
}
export default Companies;
