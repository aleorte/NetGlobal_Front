import React from 'react';
import { MuiRow,MuiTableHead,MuiCell,TableSortLabel,Box} from '../../styles/material'
import { visuallyHidden } from '@mui/utils';

const TableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <MuiTableHead>
      <MuiRow>
        {props.headCells.map((headCell) => (
          <MuiCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight:"600"}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </MuiCell>
        ))}
      </MuiRow>
    </MuiTableHead>
  );
}
 
export default TableHead;