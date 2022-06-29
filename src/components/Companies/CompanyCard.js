import React from 'react';
import { Avatar, Grid, Typography } from '../../styles/material'
import StatsCard from '../../commons/StatsCard'
import { AssignmentInd,Business } from '../../styles/materialIcons';

const CompanyCard = (company) => {
    return ( 
        <Grid display="flex" flexDirection="column" width="100%" height="100%" gap={2} alignItems="center">
            <Avatar sx={{height:"120px",width:'120px'}} src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png">
                Company
            </Avatar>
            <Typography fontWeight={400} fontSize={25}> McDonalds </Typography>
            <Grid container display="flex" justifyContent="center" gap={5}>
                <Grid xs={4}>
                    <StatsCard icon={<AssignmentInd sx={{ fontSize: 30,color:"#8757DF" }}/>} value="24" description="Vigiladores" />
                </Grid>
                <Grid xs={4}>
                    <StatsCard icon={<Business sx={{ fontSize: 30,color:"#8757DF"  }}/>} value="5" description="Sucursales" />
                </Grid>
            </Grid>
            

        </Grid>
    );
}
 
export default CompanyCard;