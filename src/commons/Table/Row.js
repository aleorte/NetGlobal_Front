import React from 'react';
import { MuiCell,MuiRow,IconButton,Collapse,Box } from "../../styles/material";
import { KeyboardArrowUpIcon,KeyboardArrowDownIcon } from '../../styles/materialIcons'

const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <MuiRow sx={{ "& > *": { borderBottom: "unset" }, borderLeft: open ?'1px solid #2A91D1':'none' }}>
          <MuiCell sx={{width:'50px'}}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </MuiCell>
          {/* <ProductRow row={row}/> */}
        </MuiRow>
        <MuiRow sx={{borderLeft: open ?'1px solid #2A91D1':'none' }}>
          <MuiCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {/* <ProductCollapse handleClose={setOpen} row={row}/> */}
              </Box>
            </Collapse>
          </MuiCell>
        </MuiRow>
      </React.Fragment>
    );
  };