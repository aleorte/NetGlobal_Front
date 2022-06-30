import React from 'react';
import SideBar from "../../components/SideBar";
import {Box,Toolbar} from '../../styles/material'
import Company from './index';

const HomeCompany = () => {
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
        <Company/>
      </Box>
    </Box>
     );
}
 
export default HomeCompany;