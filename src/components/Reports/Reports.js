import { getCompanies } from "../../state/company";
import { getGuards } from "../../state/guards";
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
  function makeDataforGuards(a){
    const data= [['Cuil','Nombre','Apellido','Reside en', 'Estado','Hs Trabajadas']]
    for(let i=0 ; i<a.length;i++){
      let arr=[]
      arr.push(a[i]["cuil"],a[i]["name"],a[i]["lastName"],a[i]["province"])
      a[i]["active"] ? arr.push("Activo") :  arr.push("Inactivo")
      arr.push(a[i]["workedHours"])
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
    const {guards} = useSelector(state=>state.guard)
    useEffect(()=>{
          dispatch(getCompanies())
          dispatch(getGuards())
      },[])
      console.log(guards)
    const toDownload = makeDataforCompanies(companies)
    const toDownloadGuards = makeDataforGuards(guards)
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
    <IconButton align="right"  onClick={()=> downloadFile(toDownload,'companyReport.csv')}><DownloadIcon/></IconButton>
    <Box sx={ {marginTop: "80px"}} >
    <TableContainer component={Paper} style={{ width: 900 }}>
      <Table sx={{ minWidth: 75 }}   aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Cuil</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Apellido</StyledTableCell>
            <StyledTableCell align="center">Reside en </StyledTableCell>
            <StyledTableCell align="center">Estado</StyledTableCell>
            <StyledTableCell align="center">Hs Trabajadas</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guards.map((row) => (
            <StyledTableRow key={row.cuil}>
             <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.lastName}</StyledTableCell>
              <StyledTableCell align="center">{row.province}</StyledTableCell>
              <StyledTableCell align="center">{row.active ? 'Activo' : 'Inactivo'}</StyledTableCell>
              <StyledTableCell align="center">{row.workedHours}</StyledTableCell>
           
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <IconButton align="right"  onClick={()=> downloadFile(toDownloadGuards ,'guardReport.csv')}><DownloadIcon/></IconButton>
    </Box>
    </Box>

  );
}


