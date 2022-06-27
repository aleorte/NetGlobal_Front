import React from 'react';
import { MuiTableContainer, MuiRow, MuiCell, MuiTableBody, MuiTableHead, Paper } from '../../styles/material';
import Row from './Row';

const Table = () => {
    return ( 
        <MuiTableContainer style={{ width: '100%' }} component={Paper}>
        <Table aria-label="collapsible table">
              {/* <ProductHead/> */} 
          <MuiTableBody>
            {/* {products.map((product) => (
              <Row key={product.name} row={product} />
            ))} */}
          </MuiTableBody>
        </Table>
      </MuiTableContainer>
     );
}
 
export default Table;