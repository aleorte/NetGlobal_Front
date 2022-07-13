import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Alert,
  Paper,
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
  OutlinedInput,
  Chip,
} from "../../styles/material";
import { AddBoxOutlinedIcon, CloseIcon } from "../../styles/materialIcons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationGuard } from "../../utils/validations";
import { provinciesArg } from "../../utils/provincies";
import { addGuard, getGuards } from "../../state/guards";
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

const ImagePreview = styled(Box)({
  height: "250px",
  width: "400px",
  backgroundSize: "cover",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddGuard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [licenses, setLicenses] = useState([]);
  const { success, loading, actionType, error } = useSelector(
    (state) => state.guard
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
  } = useForm({ resolver: yupResolver(validationGuard), mode: "onSubmit" });

  const imageGuard = watch("image");
  const provinceGuard = watch("province");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLicenses(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    error &&
      dispatch(setAlert({
        severity: "error",
        message: "El registro ha fallado. Intentelo mas tarde",
      }));
    if (success && actionType === "add") {
      dispatch(setAlert({
        severity: "success",
        message: "El vigilador ha sido registado con exito!",
      }));
      dispatch(getGuards());
      setOpenDialog(false)
    }
  }, [success, error]);

  useEffect(()=>{
    dispatch(getProvinces())
  },[])

  const onSubmit = (data) => {
    if (licenses.length===0) return
    dispatch(addGuard({...data,licenses:licenses.map(province=>province.id)}))
    console.log({...data,licenses:licenses.map(province=>province.id)});
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
              Añadir Vigilador
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
                {...register("cuil")}
                error={errors.cuil !== undefined}
                helperText={errors.cuil?.message}
              />
              <Grid container justifyContent="space-between">
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    {...register("lastName")}
                    error={errors.lastName !== undefined}
                    helperText={errors.lastName?.message}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    {...register("name")}
                    error={errors.name !== undefined}
                    helperText={errors.name?.message}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={errors.email !== undefined}
                helperText={errors.email?.message}
              />
            </AreaContainer>

            <AreaContainer>
              <Typography fontWeight="bold" variant="h6">
                Image
              </Typography>
              <Divider />
              <TextField fullWidth label="Url" {...register("image")} />
              <Paper sx={{ display: "flex", justifyContent: "center" }}>
                <ImagePreview sx={{ backgroundImage: `url(${imageGuard})` }}>
                  {" "}
                </ImagePreview>
              </Paper>
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
                  {...register("province")}
                  error={errors.province !== undefined}
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
            <AreaContainer>
              <Typography fontWeight="bold" variant="h6">
                Licencias
              </Typography>
              <Divider />
              <FormControl sx={{ m: 1 , mb:"200px" }}>
                <InputLabel id="demo-multiple-chip-label">Provinces</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  fullWidth
                  value={licenses}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.name} label={value.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {provinces.map((province) => (
                    <MenuItem key={province.name} value={province}>
                      {province.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default AddGuard;
