import {
  Modal,
  TextField,
  Button,
  Box,
  IconButton,
  Stack,
} from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChange from "../../../hooks/useChange";
import { styleModal } from "../../../utils/modelUtils";
import { EditIcon } from "../../../styles/materialIcons";
import TextFieldModals from "../../../commons/TextFieldStyled/TextFieldModal";
import swal from "sweetalert";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useDispatch } from "react-redux";
import { getCompanies } from "../../../state/company";

export const EditCompany = ({ selected }) => {
  const [stateModal, setStateModal] = useState(false);
  const [contractStartDate, setContractStartDate] = useState(
    new Date("07/01/2022")
  );
  const [contractEndDate, setContractEndDate] = useState(
    new Date("07/01/2022")
  );
  const navigate = useNavigate();
  const cuit = useChange("");
  const legalName = useChange("");
  const coordinateLatitude = useChange("");
  const coordinateLength = useChange("");
  const street = useChange("");
  const number = useChange("");
  const location = useChange("");
  const logo=useChange("")

  const dispatch = useDispatch();

  const openCloseModal = () => {
    setStateModal(!stateModal);
  };
  const handleDateChange = (newValue) => {
    setContractStartDate(newValue);
  };
  const handleDate2Change = (newValue) => {
    setContractEndDate(newValue);
  };


  const handleModel = (e) => {
    e.preventDefault();
    console.log(cuit)
    console.log(legalName)
    const company = {
      cuit: cuit.state,
      legalName: legalName.state,
      contractStartDate: contractStartDate,
      contractEndDate: contractEndDate,
      street: street.state,
      number: Number(number.state),
      coordinateLatitude: Number(coordinateLatitude.state),
      coordinateLength: Number(coordinateLength.state),
      location: location.state,
      logo: logo.state,
    };
    console.log(company)
    axios
      .put(`http://localhost:3001/company/${selected.id}`, company)
      .then((res) => res.data)
      .then(() => {
        swal({ tittle: "Edit", text: "Compañía editada", icon: "success" });
        dispatch(getCompanies());
        navigate("/home/companias");
        openCloseModal();
      })
      .catch((err) => {
        swal({
          tittle: "Algo salió mal",
          text: "Algo salió mal",
          icon: "error",
        });
        console.log(err);
      });
  };

  return (
    <>
      <IconButton
        color="secondary"
        aria-label="edit"
        onClick={() => openCloseModal()}
      >
        <EditIcon />
      </IconButton>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Editar compañía</h2>
          </div>
          <Stack spacing={4}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 4,
              }}
            >
              <TextFieldModals
                label="Nombre Legal"
                name="name"
                defaultValue={selected.legalName}
                {...legalName}
              />
              <TextFieldModals
                label="CUIT"
                defaultValue={selected.cuit}
                {...cuit}
              />
              <DesktopDatePicker
                label="Fecha de inicio de contrato"
                inputFormat="MM/dd/yyyy"
                margin="normal"
                value={contractStartDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Fecha de fin del contrato"
                inputFormat="MM/dd/yyyy"
                margin="normal"
                value={contractEndDate}
                onChange={handleDate2Change}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>

            <TextFieldModals
              label="Logo"
              defaultValue={selected.logo}
              {...logo}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr 1fr" },
                gap: 4,
              }}
            >
              <TextFieldModals
                label="Localidad"
                defaultValue={selected.location}
                {...location}
              />

              <TextFieldModals
                defaultValue={selected.street}
                label="Calle"
                {...street}
                
              />
              <TextFieldModals
                label="Número"
                defaultValue={selected.number}
                {...number}
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 4,
              }}
            >
              <TextFieldModals
                label="Latitud"
                defaultValue={selected.coordinateLatitude}
                {...coordinateLatitude}
              />
              <TextFieldModals
                label="Longitud"
                defaultValue={selected.coordinateLength}
                {...coordinateLength}
              />
            </Box>
          </Stack>
          <br />
          <br />
          <br />
          <div>
            <Button type="submit">Editar compañía</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
