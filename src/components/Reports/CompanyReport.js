import React, { useEffect } from "react";
import { getCompanies } from "../../state/company";
import { useSelector, useDispatch } from "react-redux";
import {
  MuiTableBody,
  MuiTableContainer,
  MuiTableHead,
  MuiRow,
  MuiTable,
  Paper,
  Box,
  Button
} from "../../styles/material";
import { DownloadIcon } from "../../styles/materialIcons";
import { StyledTableCell, StyledTableRow } from "./reportsStyles";
import { downloadFile } from "../../utils/reportsDownload";

function makeDataforCompanies(a) {
  const data = [
    [
      "Cuit",
      "Legal Name",
      "Inicio Contrato",
      "Fin Contrato",
      "Sucursales",
      "Casa Central",
      "Hs Totales Cubiertas",
    ],
  ];
  for (let i = 0; i < a.length; i++) {
    let arr = [];
    arr.push(
      a[i]["cuit"],
      a[i]["legalName"],
      a[i]["contractStartDate"],
      a[i]["contractEndDate"],
      a[i]["branches"].length,
      a[i]["location"],
      a[i]["hours"]
    );
    data.push(arr);
  }
  return data;
}

export default function CompanyReport() {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  const toDownload = makeDataforCompanies(companies);
  
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <MuiTableContainer component={Paper} style={{ width: 900 }}>
        <MuiTable sx={{ minWidth: 75 }} aria-label="customized table">
          <MuiTableHead>
            <MuiRow>
              <StyledTableCell align="center">Cuit</StyledTableCell>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">Incio</StyledTableCell>
              <StyledTableCell align="center">Fin</StyledTableCell>
              <StyledTableCell align="center">Sucursales</StyledTableCell>
              <StyledTableCell align="center">Casa central</StyledTableCell>
              <StyledTableCell align="center">
                Hs Totales Cubiertas
              </StyledTableCell>
            </MuiRow>
          </MuiTableHead>
          <MuiTableBody>
            {companies.map((row) => (
              <StyledTableRow key={row.legalName}>
                <StyledTableCell align="center">{row.cuit}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.legalName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.contractStartDate}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.contractEndDate}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.branches.length}
                </StyledTableCell>
                <StyledTableCell align="center">{row.location}</StyledTableCell>
                <StyledTableCell align="center">{row.hours}</StyledTableCell>
              </StyledTableRow>
            ))}
          </MuiTableBody>
        </MuiTable>
      </MuiTableContainer>
      <Button 
        variant="outlined" 
        startIcon={<DownloadIcon sx={{fontSize:"35px"}}/>}
        onClick={() => downloadFile(toDownload, "companyReport.csv")}
        color="secondary"
      >
        DESCARGAR
      </Button>
    </Box>
  );
}
