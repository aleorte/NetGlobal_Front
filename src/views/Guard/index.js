import React from "react";
import SideBar from "../../components/SideBar";
import { Box,Toolbar } from "../../styles/material"
import Dashboard from "../../commons/Dashboard";
import { useSelector } from "react-redux";
import GuardCard from "../../components/Guards/GuardCard";
import GuardCells from "../../components/Guards/GuardCells";
import guardHeaders from "../../components/Guards/guardHeaders";

const Guard = () => {

  const { guards } = useSelector(state=>state.guard)

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
        <Dashboard {...guardElements}/>
      </Box>
    </Box>
  );
};

export default Guard;