import React from 'react';
import { Avatar, Grid, Typography,Button,Box } from '../../styles/material'
import StatsCard from '../../commons/StatsCard'
import { AssignmentInd,Business,VisibilityOutlined } from '../../styles/materialIcons';
import { useSelector } from 'react-redux';
import CardActions from '../../commons/CardActions';

const GuardCard = () => {

    const {selectedGuard} = useSelector(state=>state.guard)
    
    if (!selectedGuard.id) return 
    return ( 
        <Grid display="flex" justifyContent="space-around"  flexDirection="column" width="100%" height="100%" alignItems="center" position="relative">
            <CardActions/>
            <Box textAlign="center">
                <Avatar sx={{height:"120px",width:'120px'}} src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png">
                    {selectedGuard.name[0]}
                </Avatar>
                <Typography mt={1} fontWeight={400} fontSize={25}> {selectedGuard.name + selectedGuard.lastName} </Typography>
            </Box>
            <Grid container display="flex" justifyContent="center" gap={5}>
                <Grid item xs={4}>
                    <StatsCard icon={<AssignmentInd sx={{ fontSize: 30,color:"#8757DF" }}/>} description="Vigiladores" />
                </Grid>
                <Grid item xs={4}>
                    <StatsCard icon={<Business sx={{ fontSize: 30,color:"#8757DF"  }}/>}  description="Sucursales" />
                </Grid>
            </Grid>
            <Button
                variant="outlined"
                sx={{color:"#8757DF",borderColor:"#8757DF","&:hover": {borderColor:"#8757DF"}}}
                startIcon={<VisibilityOutlined color="#8757DF"/>}
            >
                Ver Calendario
            </Button>
            
        </Grid>
    );
}
 
export default GuardCard;