import React from 'react';
import { Avatar, Grid, Typography,Button,Box } from '../../styles/material'
import StatsCard from '../../commons/StatsCard'
import CardActions from '../../commons/CardActions';
import { AssignmentInd,Business,VisibilityOutlined } from '../../styles/materialIcons';
import { useSelector } from 'react-redux';

const CompanyCard = () => {

    const {selectedCompany} = useSelector(state=>state.company)
    

    if (!selectedCompany.id) return 
    return ( 
        <Grid display="flex" justifyContent="space-around" position="relative"  flexDirection="column" width="100%" height="100%" alignItems="center">
            <CardActions/>
            <Box textAlign="center">
                <Avatar sx={{height:"120px",width:'120px',backgroundSize:"contain"}} src={selectedCompany.logo}>
                    {selectedCompany.legalName[0]}
                </Avatar>
                <Typography mt={1} fontWeight={400} fontSize={25}> {selectedCompany.legalName} </Typography>
            </Box>
            <Grid container display="flex" justifyContent="center" gap={5}>
                <Grid item xs={4}>
                    <StatsCard icon={<AssignmentInd sx={{ fontSize: 30,color:"#8757DF" }}/>} value={17} description="Vigiladores" />
                </Grid>
                <Grid item xs={4}>
                    <StatsCard icon={<Business sx={{ fontSize: 30,color:"#8757DF"  }}/>} value={selectedCompany.branches.length} description="Sucursales" />
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