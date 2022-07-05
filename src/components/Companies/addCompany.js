import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
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
  FormHelperText
} from "../../styles/material";
import { CloseIcon, AddBoxOutlinedIcon } from "../../styles/materialIcons";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { provinciesArg } from "../../utils/provincies";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationCompany } from "../../utils/validations";
import moment from "moment";
import { addCompany,restart } from "../../state/company";
import { useDispatch } from "react-redux";
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
  height: "150px",
  width: "150px",
  backgroundSize: "cover",
});

export default function AddCompany() {

  const dispatch = useDispatch()  

  const [contractStartDate, setContractStartDate] = useState(
    new Date("07/01/2022")
  );
  const [contractEndDate, setContractEndDate] = useState(
    new Date("07/01/2022")
  );

  const handleDateChange = (newValue) => {
    setContractStartDate(moment(newValue).format("YYYY-MM-DD"));
  };
  const handleDate2Change = (newValue) => {
    setContractEndDate(moment(newValue).format("YYYY-MM-DD"));
  };

  const [openDialog, setOpenDialog] = useState(false);
  const companies = useSelector(state=>state.company)

  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationCompany), mode: "onSubmit" });

  useEffect(()=>{
    companies.error && dispatch(setAlert({severity:"error",message:"Hubo un problema al agregar la compañia"}))
    if (companies.success){
        dispatch(setAlert({severity:"success",message:"Compañia agregada con exito!"}))
        setOpenDialog(false)
    }
  },[companies,dispatch])

  const onSubmit = (data)=>{
    if (Object.keys(errors).length || contractEndDate < contractStartDate) return
    setOpenDialog(false)
    dispatch(addCompany({...data,contractStartDate,contractEndDate}))
  }

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
            backgroundColor: "white",
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
              Añadir compañia
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
          <Grid item xs={10} md={4} display="flex" flexDirection="column" gap={3}>
            <AreaContainer display="flex" gap={2} flexDirection="column">
              <Typography fontWeight="bold" variant="h5">
                Detalles basicos
              </Typography>
              <Divider />
              <TextField
                fullWidth
                label="CUIT"
                {...register("cuit")}
                error={errors.cuit !== undefined}
                helperText = {errors.cuit?.message}
              />
              <TextField
                fullWidth
                label="Nombre"
                {...register("legalName")}
                error={errors.legalName !== undefined}
                helperText = {errors.legalName?.message}
              />
              <Grid container justifyContent="space-between">
                <Grid item xs={5}>
                  <DesktopDatePicker
                    label="Fecha de inicio del contrato"
                    inputFormat="MM/dd/yyyy"
                    margin="normal"
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                    onChange={handleDateChange}
                    value={contractStartDate}
                  />
                </Grid>
                <Grid item xs={5}>
                  <DesktopDatePicker
                    label="Fecha de fin del contrato"
                    inputFormat="MM/dd/yyyy"
                    margin="normal"
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                    onChange={handleDate2Change}
                    value={contractEndDate}
                  />
                </Grid>
              </Grid>
            </AreaContainer>

            <AreaContainer>
              <Typography fontWeight="bold" variant="h5">
                {" "}
                Logo{" "}
              </Typography>
              <Divider />
              <TextField
                fullWidth
                label="Url"
                {...register("logo")}
              />
              <Paper sx={{ display: "flex", justifyContent: "center" }}>
                <ImagePreview>
                  {" "}
                </ImagePreview>
              </Paper>
            </AreaContainer>
            <AreaContainer>
              <Typography fontWeight="bold" variant="h5">
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
                  defaultValue=""
                  {...register("location")}
                  error={errors.location !== undefined}
                >
                  {provinciesArg.map((province) => (
                    <MenuItem key={province} value={province}>{province}</MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{color:"red"}}> {errors.location && errors.location.message}</FormHelperText>
              </FormControl>
              <Grid container justifyContent="space-between">
                <Grid item xs={7}>
                <TextField
                fullWidth
                label="Calle"
                {...register("street")}
                error={errors.street !== undefined}
                helperText = {errors.street?.message}
              />
                </Grid>
                <Grid item xs={3}>
                <TextField
                fullWidth
                label="Altura"
                {...register("number")}
                error={errors.number !== undefined}
                helperText = {errors.number?.message}
              />
                </Grid>
              </Grid>
            </AreaContainer>   
            <Box sx={{ mt: "1.5rem" }}>
              <Grid display="flex" justifyContent="center" gap={3}>
                <Button type="submit" variant="contained" color="secondary">
                  Agregar
                </Button>
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
}
