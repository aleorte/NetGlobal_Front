import {
  Modal,
  Button,
  Box,
  Stack,
  MenuItem,
  TextField,
} from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChange from "../../../utils/useChange";
import { styleModal } from "../../../utils/modelUtils";
import AlertModals from "../../../commons/Alert/AlertModals";
import TextFieldModals from "../../../commons/TextFieldStyled/TextFieldModal";
import { provinciesArg } from "../../../utils/provincies";

export const AddBranch = () => {
  const [stateModal, setStateModal] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [mesagge, setMesagge] = useState("");
  const [currency, setCurrency] = useState("Buenos Aires");
  const [provinceId,setProvinceId]=useState("")
  const name = useChange("");
  const street = useChange("");
  const number = useChange("");
  const location = useChange("");
  const coordinateLatitude = useChange("");
  const coordinateLength = useChange("");

  const handleProvince = (e) => {
    setCurrency(e.target.value);
    setProvinceId(e.target.value)
  };

  const openCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleModel = async (e) => {
    e.preventDefault();
    try {
      setSuccess(false);
      const newCompany = await axios.post("http://localhost:3001/branch", {});
      setSuccess(true);
      return newCompany;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={() => openCloseModal()}>Agregar sucursal</button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box
          component="form"
          autoComplete="off"
          sx={styleModal}
          onSubmit={handleModel}
        >
          <div>
            <h2>Agregar sucursal</h2>
          </div>
          <Stack spacing={4}>
            <TextFieldModals label="Nombre" {...name} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr 1fr" },
                gap: 4,
              }}
            >
              <TextFieldModals label="Localidad" {...location} />

              <TextFieldModals label="Calle" {...street} />
              <TextFieldModals label="Número" {...number} />
            </Box>

            <TextFieldModals label="Latitud" {...coordinateLatitude} />

            <TextFieldModals label="Longitud" {...coordinateLength} />

            <TextField
              select
              value={currency}
              onChange={handleProvince}
              label="Provincia"
              margin="normal"
              {...provinceId}
            >
              {provinciesArg.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <br />
          <div>
            <Button type="submit">Agregar sucursal</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
          {success ? <AlertModals /> : ""}
        </Box>
      </Modal>
    </>
  );
};
