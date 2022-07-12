import React from 'react';
import { Box,Typography,Grid,Link,Breadcrumbs,Divider,Paper} from '../../styles/material'
import { useParams } from 'react-router-dom';
import CompanyReport from '../../components/Reports/CompanyReport';
import GuardsReport from '../../components/Reports/GuardsReport'

const Reports = () => {

    const { report } = useParams()

    return ( 
        <Box>
      <Grid my={2} display="flex" flexDirection="column" gap={3}>
        <Box
          py={2}
          px={2}
          component={Paper}
          elevation={0}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight={500} fontSize={25}>
            Reportes
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" separator=">">
            <Link underline="hover" color="inherit">
              NetGlobal
            </Link>
            <Link underline="hover" color="inherit">
              Reportes
            </Link>
            <Typography color="text.primary">
                {report.charAt(0).toUpperCase() + report.slice(1)}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Divider />
        {report==="companias" && <CompanyReport/>}
        {report==="vigiladores" && <GuardsReport/>}
      </Grid>
    </Box>
     );
}
 
export default Reports;