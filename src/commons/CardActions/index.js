import { Tooltip } from '@mui/material';
import React from 'react';
import { IconButton,Box } from '../../styles/material';
import { DeleteIcon,EditIcon } from '../../styles/materialIcons'

const CardActions = ({handleDelete,handleEdit}) => {
    return ( 
        <Box position="absolute" top="5px" right="13px" >
            <Tooltip title="Edit">
                <IconButton color="secondary" onClick={handleEdit} aria-label="edit">
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton color="error" onClick={handleDelete} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        </Box>
     );
}
 
export default CardActions;