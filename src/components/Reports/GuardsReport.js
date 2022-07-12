import React, { useEffect } from "react";
import { getGuards } from "../../state/guards";
import { useSelector, useDispatch } from "react-redux";
import {
  MuiTableBody,
  MuiTableContainer,
  MuiTableHead,
  MuiRow,
  MuiTable,
  Button,
  Paper,
  Box
} from "../../styles/material";
import { DownloadIcon } from "../../styles/materialIcons";
import { StyledTableCell, StyledTableRow } from "./reportsStyles";
import { downloadFile } from "../../utils/reportsDownload";

function makeDataforGuards(a) {
  const data = [
    ["Cuil", "Nombre", "Apellido", "Reside en", "Estado", "Hs Trabajadas"],
  ];
  for (let i = 0; i < a.length; i++) {
    let arr = [];
    arr.push(a[i]["cuil"], a[i]["name"], a[i]["lastName"], a[i]["province"]);
    a[i]["active"] ? arr.push("Activo") : arr.push("Inactivo");
    arr.push(a[i]["workedHours"]);
    data.push(arr);
  }
  return data;
}

const GuardsReport = () => {
  const dispatch = useDispatch();
  const { guards } = useSelector((state) => state.guard);

  useEffect(() => {
    dispatch(getGuards());
  }, []);

  const toDownloadGuards = makeDataforGuards(guards);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <MuiTableContainer component={Paper} style={{ width: 900 }}>
        <MuiTable sx={{ minWidth: 75 }} aria-label="customized table">
          <MuiTableHead>
            <MuiRow>
              <StyledTableCell align="center">Cuil</StyledTableCell>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">Apellido</StyledTableCell>
              <StyledTableCell align="center">Reside en </StyledTableCell>
              <StyledTableCell align="center">Estado</StyledTableCell>
              <StyledTableCell align="center">Hs Trabajadas</StyledTableCell>
            </MuiRow>
          </MuiTableHead>
          <MuiTableBody>
            {guards.map((row) => (
              <StyledTableRow key={row.cuil}>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                <StyledTableCell align="center">{row.province}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.active ? "Activo" : "Inactivo"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.workedHours}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </MuiTableBody>
        </MuiTable>
      </MuiTableContainer>
      <Button 
        variant="outlined" 
        startIcon={<DownloadIcon sx={{fontSize:"35px"}}/>}
        onClick={() => downloadFile(toDownloadGuards, "guardsReport.csv")}
        color="secondary"
      >
        DESCARGAR
      </Button>
    </Box>
  );
};

export default GuardsReport;
