import { Grid, Typography, Divider, Paper } from '../../styles/material';
import React from 'react';
import MapView from '../MapView';

const Companies = () => {
    return ( 
        <Grid mx={2} my={2} display="flex" flexDirection="column" gap={3}>
            <Typography fontWeight={500} fontSize={25}> Compañias </Typography>
            <Divider/>
            <Grid container mt={2} display="flex" justifyContent="space-around">
                <Grid xs={12} component={Paper} height="400px" borderRadius={3} md={6} sx={{backgroundColor:"white"}}>
                    <MapView/>
                </Grid>
                <Grid xs={12} height="200px" borderRadius={3} md={4} sx={{backgroundColor:"white"}}>

                </Grid>
            </Grid>
        </Grid>
    );
}
 
export default Companies;