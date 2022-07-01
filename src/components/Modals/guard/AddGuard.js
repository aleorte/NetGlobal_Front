import { Modal, Button, Box, Stack,TextField, MenuItem} from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import useChange from "../../../hooks/useChange";
import { styleModal } from "../../../utils/modelUtils";
import AlertModals from "../../../commons/Alert/AlertModals";
import TextFieldModals from "../../../commons/TextFieldStyled/TextFieldModal";
import { provinciesArg } from "../../../utils/provincies";

export const AddGuard = () => {
  const [stateModal, setStateModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mesagge, setMesagge] = useState("");
  const [currency, setCurrency] = useState("Buenos Aires");
  const [provinceId,setProvinceId]=useState("")
  const name = useChange("");
  const lastName = useChange("");
  const cuil = useChange("");
  const email = useChange("");
  const street = useChange("");
  const number = useChange("");
  const location = useChange("");
  const province = useChange("");
  const coordinateLatitude = useChange("");
  const coordinateLength = useChange("");
  const licenses=useChange("")

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
      const newGuard = await axios.post("http://localhost:3001/employees", {
        name: name.state,
        lastName: lastName.state,
        cuil: cuil.state,
        email: email.state,
        street: street.state,
        number: number.state,
        location: location.state,
        province:province.state,
        coordinateLatitude: coordinateLatitude.state,
        coordinateLength: coordinateLength.state,
        licenses: licenses.state,
      });
      setSuccess(true);
      return newGuard;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={() => openCloseModal()}>Agregar Vigilante</button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Agregar Vigilante</h2>
          </div>
          <Stack spacing={4}>
          <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr 1fr" },
                gap: 4,
              }}
            >
              <TextFieldModals label="Nombre" {...name} />
              <TextFieldModals label="Apellido" {...lastName} />
            <TextFieldModals label="Cuil" {...cuil} />
            
            </Box>
            <Stack>
              <TextFieldModals
                fullWidth
                label="Correo electrónico"
                {...email}
              />
            </Stack>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 1,
              }}
            >
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
                <TextFieldModals label="Localidad" {...location} />
                <TextFieldModals label="Calle" {...street} />
                <TextFieldModals label="Número" {...number} />
              
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr 1fr" },
                gap: 4,
              }}
            >
              
                <TextFieldModals label="Licencias" {...licenses} />
                <TextFieldModals label="Latitud" {...coordinateLatitude} />
                <TextFieldModals label="Longitud" {...coordinateLength} />
                </Box>
          </Stack>
          <br />
          <div>
            <Button type="submit">Agregar Vigilante</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
          {success ? <AlertModals /> : ""}
          
        </Box>
      </Modal>
    </>
  );
};
