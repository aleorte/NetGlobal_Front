import { styled } from "@mui/system";
import { MuiCell,MuiRow } from '../../styles/material'
import { tableCellClasses } from '@mui/material/TableCell'

export const StyledTableCell = styled(MuiCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
export const StyledTableRow = styled(MuiRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));