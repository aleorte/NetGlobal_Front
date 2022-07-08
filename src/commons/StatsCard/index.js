import React from 'react';
import { Box,Grid, Typography } from '../../styles/material'

const StatsCard = ({icon,value,description}) => {
    return ( 
        <Grid container display="flex" gap={1} justifyContent="center">
            <Grid item xs={5} container mt={1} mb={0.8} justifyContent="center" alignContent="center" sx={{backgroundColor:"#DCD2EE",borderRadius:"7px"}}>
                <Box display="flex" justifyContent="center">
                    {icon}
                </Box>
            </Grid>
            <Grid item xs={6} display="flex" flexDirection="column" justifyContent="space-around">
                <Typography fontWeight={400} fontSize={25}> {value}</Typography>
                <Typography sx={{color:"gray"}}> {description} </Typography>
            </Grid>
        </Grid>
     );
}
 
export default StatsCard;