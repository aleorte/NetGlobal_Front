import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Box, } from "../../styles/material"
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router";
import Footer from '../../components/Footer/Footer'
import { CalendarBranch } from "../../components/Calendar/CalendarBranch";
import { CalendarBox } from "../../components/Calendar/CalendarBox";

const CalendarBranchView = () => {

  const dispatch = useDispatch()
  const { admins } = useSelector(state=>state.admin)
  const { entity } = useParams()
  const {branchAssignment}=useSelector(state=>state.branchAssignment)
  useEffect(()=>{
    
  },[entity,dispatch])



  return (
    <>
    <Box sx={{ display: "flex" }}>
      <CalendarBox/>
       <CalendarBranch/>
      </Box>
    <Footer/>
    </>
  );
};

export default CalendarBranchView;