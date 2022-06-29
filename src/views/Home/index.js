import React from "react";
import SideBar from "../../components/SideBar";
import { Box,Toolbar } from "../../styles/material"
import Dashboard from "../../commons/Dashboard";
import { useSelector } from "react-redux";
import CompanyCard from "../../components/Companies/CompanyCard";
import CompanyCells from "../../components/Companies/CompanyCells";
import companyHeaders from "../../components/Companies/CompanyHeaders"
import GuardCard from "../../components/Guards/GuardCard";
import GuardCells from "../../components/Guards/GuardCells";
import guardHeaders from "../../components/Guards/guardHeaders";
import { useParams } from "react-router";

const Home = () => {

  const { companies } = useSelector(state=>state.company)
  const { guards } = useSelector(state=>state.guard)
  const { entity } = useParams()

  console.log(entity)

  const companyElements = {
    data:companies,
    headers:companyHeaders, 
    card:<CompanyCard/>, 
    Cells:CompanyCells,
    label:"Company",
  }

  const guardElements = {
    data:guards,
    headers:guardHeaders, 
    card:<GuardCard/>, 
    Cells:GuardCells,
    label:"Vigiladores",
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
        {entity==="vigiladores" && <Dashboard {...guardElements}/>}
        {entity==="companias" && <Dashboard {...companyElements}/>}
      </Box>
    </Box>
  );
};

export default Home;

