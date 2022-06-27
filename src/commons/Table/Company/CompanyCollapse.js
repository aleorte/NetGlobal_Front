import React from "react";
import { Grid,TextField,InputAdornment,Button} from '../../../styles/material'
import { DeleteIcon } from '../../../styles/materialIcons'

const CompanyCollapse = () => {
  return (
    <Grid container spacing={4} sx={{ p: "40px 0 40px 0" }}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Name"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Old Price"
          InputProps={{
            readOnly: true,
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          inputProps={{ inputMode: "numeric" }}
          label="New Price"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>
      <Grid
        item
        sx={{ width: "100%" }}
        display={"flex"}
        justifyContent="space-between"
      >
        <Grid display="flex" gap={3}>
          <Button
            item
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            item
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
        </Grid>
        <Button
          item
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          DELETE
        </Button>
      </Grid>
    </Grid>
  );
};

export default CompanyCollapse;
