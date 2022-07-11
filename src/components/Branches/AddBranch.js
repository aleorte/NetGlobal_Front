import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Alert,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Slide,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Grid,
  TextField,
  Divider,
  Dialog,
  Button,
  FormHelperText,
  LoadingButton,
} from "../../styles/material";
import { AddBoxOutlinedIcon, CloseIcon } from "../../styles/materialIcons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationBranch } from "../../utils/validations";
import { provinciesArg } from "../../utils/provincies";
import { addBranch, getBranches } from "../../state/branch";
import { getProvinces } from "../../state/provinces";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../state/alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AreaContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "5px",
});

const AddBranch = ({company}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const { success, loading, actionType, error } = useSelector(
    (state) => state.branch
  );
  const { provinces } = useSelector(state=>state.province)
  const dispatch = useDispatch();

  const {
    register,
    setError,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationBranch), mode: "onSubmit" });

  const provinceGuard = watch("province");

  useEffect(() => {
    error &&
      setAlert({
        severity: "error",
        message: "El registro ha fallado. Intentelo mas tarde",
      });
    if (success && actionType === "add") {
      setAlert({
        severity: "success",
        message: "El vigilador ha sido registado con exito!",
      });
      dispatch(getBranches(company));
      setOpenDialog(false)
    }
  }, [success, error]);

  const onSubmit = (data) => {
    if (company){
      dispatch(addBranch({companyId:company,branch:data}))
    }
  };

  return (
    <>
      <IconButton aria-label="add" onClick={() => setOpenDialog(true)}>
        <AddBoxOutlinedIcon sx={{ fontSize: 40, color: "#8757DF" }} />
      </IconButton>
      <Dialog fullScreen open={openDialog} TransitionComponent={Transition}>
        <AppBar
          sx={{
            position: "relative",
            height: "67px",
            backgroundColor: "#DCD2EE",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenDialog(false)}
              aria-label="close"
            >
              <CloseIcon color="secondary" />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, color: "black" }}
              variant="h6"
              component="div"
            >
              Añadir Sucursal
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          container
          sx={{
            backgroundColor: "#F4F6F8",
            pt: "4rem",
            paddingBottom: "4rem",
          }}
          display="flex"
          justifyContent="center"
        >
          <Grid
            item
            xs={10}
            md={4}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <AreaContainer display="flex" gap={2} flexDirection="column">
              <Typography fontWeight="bold" variant="h6">
                Detalles basicos
              </Typography>
              <Divider />
              <TextField
                fullWidth
                label="CUIT"
                {...register("cuit")}
                error={errors.cuit !== undefined}
                helperText={errors.cuit?.message}
              />
              
            <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Nombre"
                  {...register("name")}
                  error={errors.name !== undefined}
                  helperText={errors.name?.message}
                />
            </Grid>
            </AreaContainer>
            <AreaContainer>
              <Typography fontWeight="bold" variant="h6">
                Ubicación
              </Typography>
              <Divider />
              <FormControl fullWidth>
                <InputLabel> Provincia </InputLabel>
                <Select
                  label="Provincia"
                  MenuProps={{
                    style: {
                      maxHeight: 300,
                    },
                  }}
                  {...register("provinceName")}
                  error={errors.provinceName !== undefined}
                  defaultValue={provinceGuard || "Buenos Aires"}
                >
                  {provinciesArg.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "red" }}>
                  {errors.location && errors.location.message}
                </FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                label="Ciudad"
                {...register("location")}
                error={errors.location !== undefined}
                helperText={errors.location?.message}
              />
              <Grid container justifyContent="space-between">
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    label="Calle"
                    {...register("street")}
                    error={errors.street !== undefined}
                    helperText={errors.street?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Altura"
                    {...register("number")}
                    error={errors.number !== undefined}
                    helperText={errors.number?.message}
                  />
                </Grid>
                {locationError && (
                  <Alert sx={{ marginTop: "20px" }} severity="warning">
                    {" "}
                    No fue posible localizar la direccion, por favor intente de
                    nuevo.
                  </Alert>
                )}
              </Grid>
            </AreaContainer>
            <Box sx={{ mt: "1.5rem" }}>
              <Grid display="flex" justifyContent="center" gap={3}>
                <LoadingButton
                  type="submit"
                  color="secondary"
                  loading={loading}
                  variant="contained"
                >
                  Añadir
                </LoadingButton>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancelar
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default AddBranch;
