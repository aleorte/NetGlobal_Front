import { Typography,Box } from '../../styles/material';
import React from 'react';

const Status = ({date}) => {
    const actual_date = new Date().toISOString().split('T')[0]
    const isActive = date > actual_date
    return ( 
        <Box width="80px" textAlign="center" sx={{backgroundColor: isActive ? "#C5E1A5" : "#EF9A9A",borderRadius:"10px"}}>
            <Typography color={isActive ? "green" : "error"}> {isActive ? "Active" : "Inactive"}  </Typography>
        </Box>
     );
}
 
export default Status;