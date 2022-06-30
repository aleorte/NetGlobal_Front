import React,{ useState } from "react";
import {
  Grid,
  IconButton,
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
} from "../../styles/material";
import TableHead from "./TableHead";
import { descendingComparator, stableSort } from "../../utils/functions";
import { SearchIcon, AddBoxOutlinedIcon } from "../../styles/materialIcons";

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable({ headers, data, Cells, handleSelect }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("cuit");
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search,setSearch] = useState("")

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    setSelected(data.find((element) => element.id === id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filter = (array,value) =>{
    return array.filter((element)=> element["legalName"].toLowerCase().includes(value.toLowerCase()))
  }

  const isSelected = (id) =>
    selected === data.find((element) => element.id === id);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, marginTop: "4rem" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={10} sm={7} pl={5} mt={2}>
            <TextField
              sx={{ my: 3 }}
              onChange = {(e)=>{setSearch(e.target.value)}}
              value = {search}
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
            <IconButton aria-label="add">
              <AddBoxOutlinedIcon sx={{ fontSize: 40, color: "#8757DF" }} />
            </IconButton>
          </Grid>
        </Grid>
        <MuiTableContainer>
          <MuiTable sx={{ minWidth: 75 }} aria-labelledby="tableTitle">
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={headers.length}
              headCells={headers}
            />
            <MuiTableBody>
              {stableSort(filter(data,search), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);

                  return (
                    <Cells
                      data={row}
                      handleClick={handleClick}
                      isItemSelected={isItemSelected}
                      handleSelect={handleSelect}
                    />
                  );
                })}
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
