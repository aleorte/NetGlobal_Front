import React from "react";
import SideBar from "../../components/SideBar";
import { Box,Toolbar } from "../../styles/material"
import Dashboard from "../../commons/Dashboard";
import { useSelector } from "react-redux";
import CompanyCard from "../../components/Companies/CompanyCard";
import CompanyCells from "../../components/Companies/CompanyCells";
import companyHeaders from "../../components/Companies/CompanyHeaders"

const Company = () => {

  const { companies } = useSelector(state=>state.company)
  
  const companyElements = {
    data:companies,
    headers:companyHeaders, 
    card:<CompanyCard/>, 
    Cells:CompanyCells,
    label:"Compañias",
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          minHeight:"calc(100vh - 64px)",
          backgroundColor:"#F4F6F8"
        }}
      >
        <Toolbar/>
        <Dashboard {...companyElements}/>
      </Box>
    </Box>
  );
};

export default Company;