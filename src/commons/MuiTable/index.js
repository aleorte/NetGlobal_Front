import React, { useState } from "react";
import {
  Grid,
  Paper,
  MuiRow,
  MuiTablePagination,
  MuiTableContainer,
  MuiCell,
  MuiTableBody,
  MuiTable,
  Box,
  InputAdornment,
  TextField,
  Typography,
} from "../../styles/material";
import TableHead from "./TableHead";
import { descendingComparator, stableSort } from "../../utils/functions";
import { SearchIcon, VisibilityOff } from "../../styles/materialIcons";
import CompanyForm from "../../components/Companies/CompanyForm";
import { useLocation, useParams } from "react-router-dom";
import AddGuard from "../../components/Guards/AddGuard";
import AddAdmin from "../../components/Admins/AddAdmin";
import AddBranch from "../../components/Branches/AddBranch";

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable({
  headers,
  data,
  Cells,
  handleClick,
  isSelected,
  label,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("cuit");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();
  const { companyId } = useParams();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filter = (array, value) => {
    return array.filter(
      (element) =>
        element[Object.keys(element)[1]]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        element[Object.keys(element)[2]]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
    );
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, marginTop: "4rem" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={10} sm={7} pl={5} mt={2}>
            <TextField
              sx={{ my: 3 }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              placeholder="Buscar"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={2} textAlign="right" mr={2}>
            {pathname === "/home/companias" && <CompanyForm type="add" />}
            {pathname === "/home/vigiladores" && <AddGuard />}
            {pathname === "/home/admins" && <AddAdmin />}
            {pathname.includes("/home/companias/") && (
              <AddBranch company={companyId} />
            )}
          </Grid>
        </Grid>
        <MuiTableContainer>
          <MuiTable sx={{ minWidth: 75 }} aria-labelledby="tableTitle">
            <TableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={headers.length}
              headCells={headers}
            />
            <MuiTableBody>
              {data.length ? (
                stableSort(filter(data, search), getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);

                    return (
                      <Cells
                        key={row.id}
                        data={row}
                        handleClick={handleClick}
                        isItemSelected={isItemSelected}
                      />
                    );
                  })
              ) : (
                <MuiCell sx={{width:"100%"}} variant="head">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <VisibilityOff
                      sx={{ fontSize: "40px", color: "lightgray" }}
                    />
                    <Typography sx={{ color: "gray" }}>
                      {" "}
                      No hay {label.toLowerCase()} disponibles{" "}
                    </Typography>
                  </Box>
                </MuiCell>
              )}
              {emptyRows > 0 && (
                <MuiRow>
                  <MuiCell colSpan={6} />
                </MuiRow>
              )}
            </MuiTableBody>
          </MuiTable>
        </MuiTableContainer>
        <MuiTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por pagina"
        />
      </Paper>
    </Box>
  );
}
