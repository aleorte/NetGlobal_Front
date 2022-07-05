import React from 'react';
import { Avatar, Grid, Typography,Button,Box, Tooltip,IconButton } from '../../styles/material'
import StatsCard from '../../commons/StatsCard'
import { AssignmentInd,Business,VisibilityOutlined, EditIcon } from '../../styles/materialIcons';
import {EditCompany} from "../../components/Modals/company/EditCompany"
import { AddBranch } from '../Modals/branch/AddBranch';
import { EditBranch } from '../Modals/branch/EditBranch';
import { AddGuard } from '../Modals/guard/AddGuard';
import { EditGuard } from '../Modals/guard/EditGuard';
import { AddAdmin } from '../Modals/admin/AddAdmin';

const CompanyCard = ({selected}) => {
    if (!selected.id) return 
    return ( 

        <Grid display="flex" justifyContent="space-around" position="relative"  flexDirection="column" width="100%" height="100%" alignItems="center">
            <Box position="absolute" top="5px" right="13px" >
                <Tooltip title="Editar">
                    <EditCompany selected={selected}/>
                </Tooltip>
            </Box>
            <Box textAlign="center">
                <Avatar sx={{height:"120px",width:'120px',backgroundSize:"contain",border:"1px solid black"}} src={selected.logo}>
                    {selected.legalName[0]}
                </Avatar>
                <Typography mt={1} fontWeight={400} fontSize={25}> {selected.legalName} </Typography>
            </Box>
            <Grid container display="flex" justifyContent="center" gap={5}>
                <Grid item xs={4}>
                    <StatsCard icon={<AssignmentInd sx={{ fontSize: 30,color:"#8757DF" }}/>} value={selected.guards} description="Vigiladores" />
                </Grid>
                <Grid item xs={4}>
                    <StatsCard icon={<Business sx={{ fontSize: 30,color:"#8757DF"  }}/>} value={selected.branches.length} description="Sucursales" />
                </Grid>
            </Grid>
            <Button
                variant="outlined"
                sx={{color:"#8757DF",borderColor:"#8757DF","&:hover": {borderColor:"#8757DF"}}}
                startIcon={<VisibilityOutlined color="#8757DF"/>}
            >
                Ver sucursales
            </Button>
            
        </Grid>
    );
}
 
export default CompanyCard;