import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
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
} from "../../styles/material";
import { CloseIcon, AddBoxOutlinedIcon, EditIcon } from "../../styles/materialIcons";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { provinciesArg } from "../../utils/provincies";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationCompany } from "../../utils/validations";
import moment from "moment";
import { addCompany, restart, getCompanies, updateCompany } from "../../state/company";
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
  height: "250px",
  width: "400px",
  backgroundSize: "cover" 
});

export default function CompanyForm({type,selected={}}) {
    
  const dispatch = useDispatch();

  const [newcontractStartDate, setNewContractStartDate] = useState(new Date());
  const [newcontractEndDate, setNewContractEndDate] = useState(new Date());
  const [locationError,setLocationError] = useState(false)
  const [dateError,setDateError] = useState(false)

  const handleDateChange = (newValue) => {
    setNewContractStartDate(newValue);
  };
  const handleDate2Change = (newValue) => {
    setNewContractEndDate(newValue);
  };

  const [ openDialog, setOpenDialog ] = useState(false);
  const { loading, success, error, actionType } = useSelector((state) => state.company);
  const {id,coordinateLatitude,contractStartDate,contractEndDate,coordinateLength,createdAt,updateAt,guards,branches,...selectedData} = selected
  
  const {
    register,
    setError,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationCompany), mode: "onSubmit" });

  const logoImage = watch("logo")
  const stateCompany = getValues("state")

 useEffect(()=>{
    if (selected.id){
      Object.entries(selectedData).forEach(prop=>{
        setValue(prop[0],prop[1])
      })
      setNewContractStartDate(moment(selected.contractStartDate).format("MM-DD-YYYY"))
      setNewContractEndDate(moment(selected.contractEndDate).format("MM-DD-YYYY"))
    }
  },[actionType,selected]) 

  const onSubmit = async (data) => {
    setLocationError(false)
    setDateError(false)
    if (Object.keys(errors).length || (contractEndDate < contractStartDate)){
      setDateError(true)
      return
    }
    const initDateFormated = moment(newcontractStartDate).format("YYYY-MM-DD")
    const endDateFormated = moment(newcontractEndDate).format("YYYY-MM-DD")
    try{
      type==="add" && await dispatch(addCompany({ ...data, contractStartDate : initDateFormated, contractEndDate : endDateFormated })).unwrap()
      type==="update" && await dispatch(updateCompany({companyId: id, companyData : { ...data, contractStartDate : initDateFormated, contractEndDate : endDateFormated }})).unwrap()
      dispatch(setAlert({severity:"success",message:`La compañia ha sido ${type==="add" ? "agregada" : "editada"} con exito!`}))
      dispatch(getCompanies())
      setOpenDialog(false)
    }catch(e){
      (e?.code === 400) && setLocationError(true)
      dispatch(setAlert({severity:"error",message:"No se pudo editar correctamente. Intente de nuevo mas tarde"}))
    }
  };

  return (
    <>
      <IconButton aria-label="add" onClick={() => setOpenDialog(true)}>
        {type==="add" && <AddBoxOutlinedIcon sx={{ fontSize: 40, color: "#8757DF" }} />}
        {type==="update" && <EditIcon sx={{ fontSize: 26, color: "#8757DF" }} /> }
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
                {type==="update" && "Editar Compañia"}
                {type==="add" && "Añadir Compañia"}
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
              <TextField
                fullWidth
                label="Nombre"
                {...register("legalName")}
                error={errors.legalName !== undefined}
                helperText={errors.legalName?.message}
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
                    value={newcontractStartDate}
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
                    value={newcontractEndDate}
                  />
                </Grid>
                {dateError && <Alert mt={1} severity="warning"> Por favor, verifique las fechas</Alert>}
              </Grid>
            </AreaContainer>

            <AreaContainer>
              <Typography fontWeight="bold" variant="h6">
                Logo
              </Typography>
              <Divider />
              <TextField fullWidth label="Url" {...register("logo")} />
              <Paper sx={{ display: "flex", justifyContent: "center" }}>
                <ImagePreview sx={{backgroundImage:`url(${logoImage})`}}> </ImagePreview>
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
                  {...register("state")}
                  error={errors.state !== undefined}
                  defaultValue = {stateCompany || "Buenos Aires"}
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
                {locationError && <Alert sx={{marginTop:"20px"}} severity="warning"> No fue posible localizar la direccion, por favor intente de nuevo.</Alert>}
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
                  {type==="update" && "Editar"}
                  {type==="add" && "Añadir"}
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
}
