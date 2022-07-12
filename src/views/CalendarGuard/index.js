import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Box, } from "../../styles/material"
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router";
import Footer from '../../components/Footer/Footer'
import { CalendarGuard } from "../../components/Calendar/CalendarGuard";


const CalendarGuardView = () => {

  const dispatch = useDispatch()
  const { admins } = useSelector(state=>state.admin)
  const { entity } = useParams()
  const {branchAssignment}=useSelector(state=>state.branchAssignment)
  useEffect(()=>{
    
  },[entity,dispatch])

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
        }}>
       <CalendarGuard/>
       </Box>
      </Box>
    <Footer/>
    </>
  );
};

export default CalendarGuardView;