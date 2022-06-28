import React from "react";
import CompanyCard from "./CompanyCard";
import CompanyCells from "./CompanyCells";
import companyHeaders from "./CompanyHeaders";
import { useSelector } from "react-redux";


const Companies = () => {

  const companiesInfo = useSelector(state=>state.companies) 

  return (
    {
      data:companiesInfo.companies ,
      headers:companyHeaders, 
      card:<CompanyCard/>, 
      Cells:CompanyCells,
      label:"Company",
    }
  )
}
export default Companies;
