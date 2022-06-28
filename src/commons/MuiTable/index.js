import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableHead from "./TableHead";
import { descendingComparator, stableSort } from "../../utils/functions";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable({ headers, data }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    console.log(selected);
  }, [selected]);

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

  const isSelected = (id) =>
    selected === data.find((element) => element.id === id);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, marginTop: "4rem" }}>
        <Grid container>
          <Grid item xs={10} sm={7} pl={5} mt={2}>
            <TextField
              sx={{ my: 3 }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <TableContainer>
          <Table sx={{ minWidth: 75 }} aria-labelledby="tableTitle">
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={headers.length}
              headCells={headers}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          width: "100px",
                          color: "#545252",
                        }}
                      >
                        <Typography sx={{ width: "100px" }}>
                          {row.cuit}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontSize: "15px", width: "300px" }}
                      >
                        <Typography sx={{ width: "100px", fontWeight: 600 }}>
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontSize: "15px", color: "#545252" }}
                      >
                        <Typography sx={{ width: "100px" }}>
                          {row.status}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontSize: "15px", color: "#545252" }}
                      >
                        {row.inicio}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontSize: "15px", color: "#545252" }}
                      >
                        {row.final}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
