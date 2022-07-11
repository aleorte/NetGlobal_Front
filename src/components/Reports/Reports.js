import { getCompanies } from "../../state/company";
import { useSelector,useDispatch } from "react-redux";
import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Box from  '@mui/material/Box';
import { IconButton } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DownloadIcon from '@mui/icons-material/Download';

function makeDataforCompanies(a){
    const data= [['Cuit','Legal Name','Inicio Contrato','Fin Contrato', 'Sucursales','Casa Central','Hs Totales Cubiertas']]
    for(let i=0 ; i<a.length;i++){
      let arr=[]
      arr.push(a[i]["cuit"],a[i]["legalName"],a[i]["contractStartDate"],a[i]["contractEndDate"],a[i]["branches"].length,a[i]["location"], a[i]["hours"])
      data.push(arr)}
      return data 
  }
  function makeCsv(rows){
    return rows.map(r => r.join(',')).join("\r\n")
    }

  function downloadFile(data,name ="report.csv"){
    //creamos un nuevo blob y definimos el type 
    const blob = new Blob([makeCsv(data)],{type: "application/octet-stream"})
    //creamos la url para nuestro blob , este va a ser unico e irrepetible , se guarda automatica/ asi que hay que destruirla 
    const href = URL.createObjectURL(blob)
    //creo un a y le asigno las propiedades que quiero 
    const a = Object.assign(document.createElement("a"),{
        href,
        download: name
    })
    document.body.appendChild(a)
    a.click()
    //destruimos direccion url que creamos 
    URL.revokeObjectURL(href)
    a.remove()
  }

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, cuit, branches, hs) {
  return { name, cuit, branches, hs };
}



export default function Reports() {
    const dispatch = useDispatch()
    const { companies } = useSelector(state=>state.company)
    useEffect(()=>{
          dispatch(getCompanies())
      },[])
    const toDownload = makeDataforCompanies(companies)
  return (
    <Box m={5} sx={ {marginTop: "122px"}} >
    <TableContainer component={Paper} style={{ width: 900 }}>
      <Table sx={{ minWidth: 75 }}   aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Cuit</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Incio</StyledTableCell>
            <StyledTableCell align="center">Fin</StyledTableCell>
            <StyledTableCell align="center">Sucursales</StyledTableCell>
            <StyledTableCell align="center">Casa central</StyledTableCell>
            <StyledTableCell align="center">Hs Totales Cubiertas</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((row) => (
            <StyledTableRow key={row.legalName}>
             <StyledTableCell align="center">{row.cuit}</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {row.legalName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.contractStartDate}</StyledTableCell>
              <StyledTableCell align="center">{row.contractEndDate}</StyledTableCell>
              <StyledTableCell align="center">{row.branches.length}</StyledTableCell>
              <StyledTableCell align="center">{row.location}</StyledTableCell>
              <StyledTableCell align="center">{row.hours}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <IconButton align="right"  onClick={()=> downloadFile(toDownload)}><DownloadIcon/></IconButton>
    </Box>
  );
}


