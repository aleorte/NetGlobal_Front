import { Modal, Button, Box, Stack,TextField, MenuItem} from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import useChange from "../../../hooks/useChange";
import { styleModal } from "../../../utils/modelUtils";
import TextFieldModals from "../../../commons/TextFieldStyled/TextFieldModal";
import { provinciesArg } from "../../../utils/provincies";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const EditGuard = (selectedGuard) => {
  const [stateModal, setStateModal] = useState(false);
  const [currency, setCurrency] = useState("Buenos Aires");
  const navigate=useNavigate()
  const name = useChange("");
  const lastName = useChange("");
  const cuil = useChange("");
  const email = useChange("");
  const street = useChange("");
  const number = useChange("");
  const location = useChange("");
  const coordinateLatitude = useChange("");
  const coordinateLength = useChange("");
  const licenses=useChange("")
  const image=useChange("")

  const handleProvince = (e) => {
    setCurrency(e.target.value);
  };

  const openCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleModel = async (e) => {
    e.preventDefault();
    const employee={
      name: name.state,
      lastName: lastName.state,
      cuil: cuil.state,
      email: email.state,
      street: street.state,
      number: number.state,
      location: location.state,
      province:currency,
      coordinateLatitude: coordinateLatitude.state,
      coordinateLength: coordinateLength.state,
      licenses: [Number(licenses.state)],
    }
    console.log(employee.licenses)
      axios.put(`http://localhost:3001/employees/${selectedGuard.id}`, employee)
      .then((res) => res.data)
      .then(() => {
        swal({ tittle: "Creada", text: "Compañía agregada", icon: "success" });
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
      <button onClick={() => openCloseModal()}>Editar Vigilante</button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Editar Vigilante</h2>
          </div>
          <Stack spacing={4}>
          <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr 1fr" },
                gap: 4,
              }}
            >
              <TextFieldModals label="Nombre" {...name} defaultValue={selectedGuard.name}/>
              <TextFieldModals label="Apellido" {...lastName} defaultValue={selectedGuard.lastName} />
            <TextFieldModals label="Cuil" {...cuil} defaultValue={selectedGuard.cuil}/>
            
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 4,
              }}>
              <TextFieldModals
                label="Correo electrónico"
                defaultValue={selectedGuard.email}
                {...email}
              />
              <TextFieldModals
                label="Foto de perfil url"
                defaultValue={selectedGuard.image}
                {...image}
              />
            </Box>
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
            >
              {provinciesArg.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
                <TextFieldModals label="Localidad" defaultValue={selectedGuard.location} {...location} />
                <TextFieldModals label="Calle" defaultValue={selectedGuard.street} {...street} />
                <TextFieldModals label="Número" defaultValue={selectedGuard.number} {...number} />
              
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr 1fr" },
                gap: 4,
              }}
            >
              
                <TextFieldModals label="Licencias" defaultValue={selectedGuard.licenses} {...licenses} />
                <TextFieldModals label="Latitud" defaultValue={selectedGuard.coordinateLatitude} {...coordinateLatitude} />
                <TextFieldModals label="Longitud" defaultValue={selectedGuard.coordinateLength} {...coordinateLength} />
                </Box>
          </Stack>
          <br />
          <br />
          <div>
            <Button type="submit">Editar Vigilante</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
