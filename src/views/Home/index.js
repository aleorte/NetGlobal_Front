import React from "react";
import SideBar from "../../components/SideBar";
import { Box,Toolbar } from "../../styles/material"
import { Apartment,AssignmentInd,QueryStats,SupervisedUserCircle } from '../../styles/materialIcons'
import Companies from '../../components/Companies'

const options = [
  {label:"Compañias",icon:<Apartment/>},
  {label:"Vigiladores",icon:<AssignmentInd/>},
  {label:"Reportes",icon:<QueryStats/>}
]

const adminsOptions = [
  {label:"Usuarios",icon:<SupervisedUserCircle/>}
]

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar options={options} adminOptions={adminsOptions}/>
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
        <Companies/>
        
      </Box>
    </Box>
  );
};

export default Home;
