import React, { useEffect } from "react";
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
    const { branches } = useSelector(state=>state.branch)

    useEffect(()=>{
        dispatch(getBranches(companyId))
    },[])

    const branchElements = {
        data:branches,
        headers:branchHeaders, 
        Card:BranchCard, 
        Cells:BranchCells,
        label:"Sucursales",
    }

  return <Dashboard {...branchElements} />
  
};

export default Branches;