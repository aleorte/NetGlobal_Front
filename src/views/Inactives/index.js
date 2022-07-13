import React from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Link,
  Breadcrumbs,
  Divider,
  Tab,
  Tabs,
} from "../../styles/material";
import PendingAbsences from "../../components/PendingAbsences";
import PastAbsences from "../../components/PastAbsences";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    value === index &&
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const Inactives = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            Inasistencias
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" separator=">">
            <Link underline="hover" color="inherit">
              NetGlobal
            </Link>
            <Link underline="hover" color="inherit">
              Inasistencias
            </Link>
            <Typography color="text.primary">{value ? "Pasadas" : "Pendientes"}</Typography>
          </Breadcrumbs>
        </Box>
        <Divider />

        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab label="PENDIENTES" />
            <Tab label="PASADAS" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <PendingAbsences/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PastAbsences/> 
          </TabPanel>
        </Box>
      </Grid>
    </Box>
  );
};

export default Inactives;
