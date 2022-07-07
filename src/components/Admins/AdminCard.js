import React from 'react';
import { Avatar, Grid, Typography,Button,Box } from '../../styles/material'
import StatsCard from '../../commons/StatsCard'
import { AssignmentInd,Business,VisibilityOutlined } from '../../styles/materialIcons';
import EditAdmin from './EditAdmin';

const AdminCard = ({selected}) => {

    if (!selected?.id) return 
    return ( 
        <Grid display="flex" justifyContent="space-around"  flexDirection="column" width="100%" height="100%" alignItems="center" position="relative">
            <Box position="absolute" top="5px" right="13px">
                <EditAdmin selected={selected}/>
            </Box>
            <Box textAlign="center">
                <Avatar sx={{height:"120px",width:'120px'}} src={selected?.image}>
                    {selected.name[0]}
                </Avatar>
                <Typography mt={1} fontWeight={400} fontSize={25}> {selected.lastName + " " + selected.name} </Typography>
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
 
export default AdminCard;