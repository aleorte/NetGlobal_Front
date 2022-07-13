import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Box, } from "../../styles/material"
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router";
import Footer from '../../components/Footer/Footer'
import { CalendarGuard } from "../../components/Calendar/CalendarGuard";
import { CalendarBoxGuard } from "../../components/Calendar/CalendarBox/calendarBoxGuard";


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
      <CalendarBoxGuard/>
       <CalendarGuard/>
       </Box>
    <Footer/>
    </>
  );
};

export default CalendarGuardView;