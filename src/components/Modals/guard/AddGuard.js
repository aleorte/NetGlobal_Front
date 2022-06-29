import { Modal, Button, Box, Stack } from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import useChange from "../../../utils/useChange";
import { styleModal } from "../../../utils/modelUtils";
import AlertModals from "../../../commons/Alert/AlertModals";
import TextFieldModals from "../../../commons/TextFieldStyled/TextFieldModal";

export const AddGuard = () => {
  const [stateModal, setStateModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mesagge, setMesagge] = useState("");
  const name = useChange("");
  const lastName = useChange("");
  const cuil = useChange("");
  const email = useChange("");
  const street = useChange("");
  const number = useChange("");
  const location = useChange("");
  const coordinateLatitude = useChange("");
  const coordinateLength = useChange("");

  const openCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleModel = async (e) => {
    e.preventDefault();
    try {
      setSuccess(false);
      const newCompany = await axios.post("http://localhost:3001/employees", {
        name: name.state,
        lastName: lastName.state,
        cuil: cuil.state,
        email: email.state,
        street: street.state,
        number: number.state,
        location: location.state,
        coordinateLatitude: coordinateLatitude.state,
        coordinateLength: coordinateLength.state,
      });
      setSuccess(true);
      return newCompany;
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
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextFieldModals label="Nombre" {...name} />
              <TextFieldModals label="Apellido" {...lastName} />

              <TextFieldModals label="Cuil" {...cuil} />
            </Stack>
            <Stack>
              <TextFieldModals
                fullWidth
                label="Correo electrónico"
                {...email}
              />
            </Stack>
            <Box sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
      }}>
            <Stack  spacing={2}>
              <TextFieldModals label="Provincia" {...coordinateLength} />
              <TextFieldModals label="Localidad" {...location} />
            </Stack>
            <Stack spacing={2}>
              <TextFieldModals label="Calle" {...street} />
              <TextFieldModals label="Número" {...number} />
            </Stack>
            <Stack  spacing={2}>
              <TextFieldModals label="Latitud" {...coordinateLatitude} />
              <TextFieldModals label="Longitud" {...coordinateLength} />
            </Stack>
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
