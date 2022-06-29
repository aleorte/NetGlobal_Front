import {
    Grid,
    Typography,
    Divider,
    Paper,
    Box,
    Breadcrumbs,
    Link,
  } from "../../styles/material";
  import React, { useEffect } from "react";
  import MapView from "../../commons/MapView";
  import EnhancedTable from "../../commons/MuiTable";
  import { Routes,Route } from "react-router";
  import { useParams,useLocation } from "react-router";
  import CompanyCard from "../../components/Companies/CompanyCard";
  import { useRoutes } from "react-router-dom";
  
  const Dashboard = ({headers,data,card,Cells,label}) => {

    const {entity} = useParams()

    return (
      <Box>
        <Grid my={2} display="flex" flexDirection="column" gap={3}>
          <Box py={2} px={2} component={Paper} elevation={0} display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={500} fontSize={25}>
              {label}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" separator=">">
              <Link underline="hover" color="inherit">
                NetGlobal
              </Link>
              <Link
                underline="hover"
                color="inherit"
              >
                {label}
              </Link>
              <Typography color="text.primary">Lista</Typography>
            </Breadcrumbs>
          </Box>
          <Divider />
          <Grid container mt={2} display="flex" justifyContent="space-between">
            <Grid
              item
              xs={12}
              component={Paper}
              height="400px"
              borderRadius={3}
              md={7}
              sx={{ backgroundColor: "white" }}
            >
              <MapView places={data.map((element)=>element.direccion)} />
            </Grid>
            <Grid
              item
              xs={12}
              component={Paper}
              borderRadius={3}
              md={4}
              sx={{ backgroundColor: "white" }}
            >
              {card}  
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <EnhancedTable headers={headers} data={data} Cells={Cells} />
        </Box>
      </Box>
    );
  };
  
  export default Dashboard;