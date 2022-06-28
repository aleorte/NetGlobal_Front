import { Tooltip } from '@mui/material';
import React from 'react';
import { IconButton } from '../../styles/material';
import { DeleteIcon,EditIcon } from '../../styles/materialIcons'

const CardActions = ({handleDelete,handleEdit}) => {
    return ( 
        <>
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
        </>
     );
}
 
export default CardActions;