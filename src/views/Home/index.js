import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Box,Toolbar } from "../../styles/material"
import Dashboard from "../../commons/Dashboard";
import { getCompanies } from "../../state/company";
import { useSelector,useDispatch } from "react-redux";
import CompanyCard from "../../components/Companies/CompanyCard";
import CompanyCells from "../../components/Companies/CompanyCells";
import companyHeaders from "../../components/Companies/CompanyHeaders"
import GuardCard from "../../components/Guards/GuardCard";
import GuardCells from "../../components/Guards/GuardCells";
import guardHeaders from "../../components/Guards/guardHeaders";
import { getGuards } from "../../state/guards";
import AdminCard from "../../components/Admins/AdminCard";
import AdminCells from "../../components/Admins/AdminCells";
import adminHeaders from '../../components/Admins/adminHeaders'
import { getAdmins } from "../../state/admin";
import { useParams } from "react-router";
import Footer from '../../components/Footer/Footer'
const Home = () => {

  const dispatch = useDispatch()
  const { companies } = useSelector(state=>state.company)
  const { guards } = useSelector(state=>state.guard)
  const { admins } = useSelector(state=>state.admin)
  const { entity } = useParams()


console.log("esto es admin",admins)


  useEffect(()=>{
    if (entity === "companias"){
      dispatch(getCompanies())
    }else if (entity === "admins"){
      dispatch(getAdmins())
    }else if (entity === "vigiladores"){
      dispatch(getGuards())
    }
  },[entity,dispatch])

  const companyElements = {
    data:companies,
    headers:companyHeaders, 
    Card:CompanyCard, 
    Cells:CompanyCells,
    label:"Compañias",
  }

  const guardElements = {
    data:guards,
    headers:guardHeaders, 
    Card:GuardCard, 
    Cells:GuardCells,
    label:"Vigiladores",
  }

  const adminElements = {
    data:admins,
    headers:adminHeaders, 
    Card:AdminCard, 
    Cells:AdminCells,
    label:"Admins",
  }

  return (
    <>
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
        {entity==="companias" && <Dashboard key={entity} {...companyElements}/>}
        {entity==="vigiladores" && <Dashboard key={entity} {...guardElements}/>}
        {entity==="admins" && <Dashboard key={entity} {...adminElements}/>}
      </Box>
    </Box>
    <Footer/>
    </>
  );
};

export default Home;

