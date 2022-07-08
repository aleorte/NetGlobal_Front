import React, { useEffect } from "react";
import { Box, Toolbar } from "../../styles/material";
import SideBar from "../../components/SideBar";
import Dashboard from "../../commons/Dashboard";
import BranchCard from "../../components/Branches/BranchCard";
import branchHeaders from "../../components/Branches/BranchHeaders";
import BranchCells from "../../components/Branches/BranchCells";
import { useSelector,useDispatch } from "react-redux";
import { getBranches } from "../../state/branch";
import { useParams } from 'react-router-dom'

const Branches = () => {

    const {companyId} = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getBranches(companyId))
    },[])

    const { branches } = useSelector(state=>state.branch)

    const branchElements = {
        data:branches,
        headers:branchHeaders, 
        Card:BranchCard, 
        Cells:BranchCells,
        label:"Sucursales",
    }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            minHeight: "calc(100vh - 64px)",
            backgroundColor: "#F4F6F8",
          }}
        >
          <Toolbar />
          <Dashboard {...branchElements} />
        </Box>
      </Box>
    </>
  );
};

export default Branches;
