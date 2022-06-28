import { Grid, Typography, Divider, Paper,Box } from '../../styles/material';
import React from 'react';
import MapView from '../../commons/MapView';
import CompanyCard from './CompanyCard';
import EnhancedTable from '../../commons/MuiTable';

function createData(id,cuit,name, status, inicio, final,direccion) {
    return {
      id,
      cuit,
      name,
      status,
      inicio,
      final,
      direccion
    };
  }
  
  const data = [
    createData("1","567432456",'Grido', "active", "17/03/2019", "11/02/2024",[-27.450567476301234,-58.98359440378527]),
    createData("2","567432456",'Carrefour', "active", "11/11/2012", "11/02/2026",[-27.453060696309066,-58.9802662692736]),
    createData("3","567432456",'Ford', "active", "11/11/2014", "11/02/2023",[ -27.45267510935069,-58.98386579347923]),
    createData("4","567432456",'Coto', "inactive", "11/11/2011", "11/02/2018",[-27.453289634571053, -58.985504028511365]),
    createData("5","567432456",'Libertad', "inactive", "11/11/2010", "11/02/2017",[-27.449377639440048, -58.98110287339204]),
    createData("6","567432456",'Otra Empresa', "active", "11/11/2010", "11/02/2027",[-27.449769939943373, -58.989421008995755]),
  ];
  
  const headers = [
    {
      id: 'cuit',
      numeric: false,
      disablePadding: false,
      label: 'CUIT',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'NOMBRE',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'ESTADO',
    },
    {
      id: 'inicio',
      numeric: false,
      disablePadding: false,
      label: 'INICIO',
    },
    {
      id: 'final',
      numeric: false,
      disablePadding: false,
      label: 'FINAL',
    },
  ];

const Companies = () => {
    return (
        <Box>
            <Grid  my={2} display="flex" flexDirection="column" gap={3}>
                <Typography fontWeight={500} fontSize={25}> Compañias </Typography>
                <Divider/>
                <Grid container mt={2} display="flex" justifyContent="space-between">
                    <Grid item xs={12} component={Paper} height="400px" borderRadius={3} md={7} sx={{backgroundColor:"white"}}>
                        <MapView places={[[-27.449769939943373, -58.989421008995755]]}/>
                    </Grid>
                    <Grid item xs={12} component={Paper} borderRadius={3} md={4} sx={{backgroundColor:"white"}}>
                        <CompanyCard/>
                    </Grid>
                </Grid>
            </Grid>
            <Box>
                <EnhancedTable data={data} headers={headers}/>
            </Box>
        </Box>

    );
}
 
export default Companies;