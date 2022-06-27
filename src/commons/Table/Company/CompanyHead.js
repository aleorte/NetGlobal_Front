import React from "react";
import { MuiCell, TableSortLabel, MuiRow, MuiTableHead } from "../../../styles/material";

const CompanyHead = () => {
  return (
    <MuiTableHead>
      <MuiRow>
        <MuiCell align="left">CUIT</MuiCell>
        <MuiCell align="left">Razon Social</MuiCell>
        <MuiCell align="left">
          
        </MuiCell>
        <MuiCell align="center">Fin</MuiCell>
      </MuiRow>
    </MuiTableHead>
  );
};

export default CompanyHead;
