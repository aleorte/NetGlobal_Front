import React, {useEffect, useState} from "react";
import {
    Grid,
    Typography,
    Divider,
    Paper,
    Box,
    Breadcrumbs,
    Link,
} from "../../styles/material";
import MapView from "../../commons/MapView";
import EnhancedTable from "../../commons/MuiTable";
import CompanyCard from "../../components/Companies/CompanyCard";
import CompanyCells from "../../components/Companies/CompanyCells";
import companyHeaders from "../../components/Companies/CompanyHeaders"
import { useSelector,useDispatch } from "react-redux";
import { getCompanies } from "../../state/company";

  
const Company = () => {

    const [selected, setSelected] = useState({});
    const {companies,loading} = useSelector(state=>state.company)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCompanies())
    },[])

    const handleClick = (event, id) => {
      setSelected(companies.find((element) => element.id === id));
    };

    const isSelected = (id) => selected === companies.find((element) => element.id === id);

    return (
      <Box>
        <Grid my={2} display="flex" flexDirection="column" gap={3}>
          <Box py={2} px={2} component={Paper} elevation={0} display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={500} fontSize={25}>
              Company
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" separator=">">
              <Link underline="hover" color="inherit">
                NetGlobal
              </Link>
              <Link
                underline="hover"
                color="inherit"
              >
                Companies
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
              <MapView selected={selected} places={companies.map((element)=>[element.coordinateLatitude,element.coordinateLength])} />
            </Grid>
            <Grid
              item
              xs={12}
              component={Paper}
              borderRadius={3}
              md={4}
              sx={{ backgroundColor: "white" }}
            >
              <CompanyCard selected={selected}/>  
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <EnhancedTable isSelected={isSelected} handleClick={handleClick} headers={companyHeaders} data={companies} Cells={CompanyCells} />
        </Box>
      </Box>
    );
  };
  
  export default Company;