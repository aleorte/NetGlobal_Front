import { Grid, Typography, Divider, Paper,Box } from '../../styles/material';
import React from 'react';
import MapView from '../MapView';
import CompanyCard from './CompanyCard';
import EnhancedTable from '../../commons/MuiTable';

function createData(cuit,name, status, inicio, final) {
    return {
      cuit,
      name,
      status,
      inicio,
      final
    };
  }
  
  const data = [
    createData("567432456",'Grido', "active", "17/03/2019", "11/02/2024"),
    createData("567432456",'Carrefour', "active", "11/11/2012", "11/02/2026"),
    createData("567432456",'Ford', "active", "11/11/2014", "11/02/2023"),
    createData("567432456",'Coto', "inactive", "11/11/2011", "11/02/2018"),
    createData("567432456",'Libertad', "inactive", "11/11/2010", "11/02/2017"),
  ];
  
  const headers = [
    {
      id: 'cuit',
      numeric: false,
      disablePadding: true,
      label: 'CUIT',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Nombre',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'estado',
    },
    {
      id: 'inicio',
      numeric: false,
      disablePadding: false,
      label: 'Inicio',
    },
    {
      id: 'final',
      numeric: false,
      disablePadding: false,
      label: 'Final',
    },
  ];

const Companies = () => {
    return (
        <Box>
            <Grid mx={2} my={2} display="flex" flexDirection="column" gap={3}>
                <Typography fontWeight={500} fontSize={25}> Compañias </Typography>
                <Divider/>
                <Grid container mt={2} display="flex" justifyContent="space-around">
                    <Grid xs={12} component={Paper} height="400px" borderRadius={3} md={6} sx={{backgroundColor:"white"}}>
                        <MapView/>
                    </Grid>
                    <Grid xs={12} component={Paper} borderRadius={3} md={4} sx={{backgroundColor:"white"}}>
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