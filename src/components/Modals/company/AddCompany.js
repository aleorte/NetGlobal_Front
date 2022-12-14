import {
  Modal,
  Button,
  Box,
  Stack,
  IconButton,
  TextField
} from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import useChange from "../../../hooks/useChange";
import { styleModal } from "../../../utils/modelUtils";
import TextFieldModals from "../../../commons/TextFieldStyled/TextFieldModal";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { AddBoxOutlinedIcon } from "../../../styles/materialIcons";
import { getCompanies } from "../../../state/company";
import { useDispatch } from "react-redux";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {validationAddCompany} from "../../../utils/validationAddCompany"
import { yupResolver } from "@hookform/resolvers/yup";

export const AddCompany = () => {
  const [stateModal, setStateModal] = useState(false);
  const[contractStartDate, setContractStartDate]=useState(new Date("07/01/2022"))
  const[contractEndDate, setContractEndDate]=useState(new Date("07/01/2022"))
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationAddCompany), mode:"onTouched" });
  const cuit = useChange("");
  const legalName = useChange("");
  const logo = useChange("");
  const coordinateLatitude = useChange("");
  const coordinateLength = useChange("");
  const street = useChange("");
  const number = useChange("");
  const location = useChange("");

  const openCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleDateChange = (newValue) => {
    setContractStartDate(newValue)
  };
  const handleDate2Change = (newValue) => {
    setContractEndDate(newValue)
  };


  const handleModel = async (e) => {
    e.preventDefault();
    console.log(contractStartDate)
    const company={
      cuit: cuit.state,
      legalName: legalName.state,
      contractStartDate:contractStartDate,
      contractEndDate:contractEndDate,
      street: street.state,
      number: Number(number.state),
      coordinateLatitude: Number(coordinateLatitude.state),
      coordinateLength:Number(coordinateLength.state),
      location: location.state,
      logo: logo.state,
    }
    axios
      .post("http://localhost:3001/company",company)
      .then((res) => res.data)
      .then(() => {
        swal({ tittle: "Creada", text: "Compa????a agregada", icon: "success" });
        dispatch(getCompanies())
        navigate("/home/companias");
        openCloseModal();
      })
      .catch((err) => {
        swal({
          tittle: "Algo sali?? mal",
          text: "Algo sali?? mal",
          icon: "error",
        });
        console.log(err);
      });
  };

  return (
    <>
      <IconButton aria-label="add" onClick={() => openCloseModal()}>
        <AddBoxOutlinedIcon sx={{ fontSize: 40, color: "#8757DF" }} />
      </IconButton>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Agregar compa????a</h2>
          </div>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 5,
              }}
            >
              <TextFieldModals
                label="Nombre Legal"
                name="name"
                {...register("name")}
                {...legalName}
              />
              <TextFieldModals label="CUIT" 
              register={{ ...register("cuit") }}
              errors={errors.cuit}
              {...cuit} />

              <DesktopDatePicker
          label="Fecha de inicio de contrato"
          inputFormat="MM/dd/yyyy"
          margin="normal"
          value={contractStartDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField  {...params} />}
        />
           <DesktopDatePicker
          label="Fecha de fin del contrato"
          inputFormat="MM/dd/yyyy"
          margin="normal"
          value={contractEndDate}
          onChange={handleDate2Change}
          renderInput={(params) => <TextField  {...params} />}
        />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr 1fr" },
                gap: 4,
              }}
            >
              <TextFieldModals label="Localidad" 
              register={{ ...register("location") }}
              errors={errors.location}
              {...location} />

              <TextFieldModals label="Calle" 
               register={{ ...register("street") }}
               errors={errors.street}
              {...street} />
              <TextFieldModals label="N??mero"
              register={{ ...register("number") }}
              errors={errors.number}
              {...number} />
            </Box>

            <TextFieldModals label="Logo" 
            register={{ ...register("logo") }}
            errors={errors.logo}
            {...logo} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 4,
              }}
            >
              <TextFieldModals label="Latitud" {...coordinateLatitude} />
              <TextFieldModals label="Longitud" {...coordinateLength} />
            </Box>
          </Stack>
          <br />
          <br />
          <div>
            <Button type="submit">Agregar compa????a</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
