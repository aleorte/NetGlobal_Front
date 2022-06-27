import React from 'react';
import { MuiCell } from '../../styles/material';

const CompanyRow = (company) => {
    return ( 
        <>
            <MuiCell> {company.cuit} </MuiCell>
            <MuiCell align="right">{company.name}</MuiCell>
            <MuiCell align="right">{company.status}</MuiCell>
            <MuiCell align="right">{company.inicio}</MuiCell>
            <MuiCell align="right">{company.final}</MuiCell>
        </>
     );
}
 
export default CompanyRow;