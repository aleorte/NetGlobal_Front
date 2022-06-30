import { Modal, Button, Box, Stack } from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChange from "../../../utils/useChange";
import {styleModal} from "../../../utils/modelUtils";
import AlertModals from "../../../commons/Alert/AlertModals";
import TextFieldModals from"../../../commons/TextFieldStyled/TextFieldModal"

export const AddBranch = () => {
  const [stateModal, setStateModal] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [mesagge, setMesagge] = useState("");
  const name=useChange("")
  const street=useChange("")
  const number=useChange("")
  const location=useChange("")
  const coordinateLatitude=useChange("")
  const coordinateLength=useChange("")
  const active=useChange("")
  

  const openCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleModel = async (e) => {
    e.preventDefault();
    try {
      setSuccess(false)
      const newCompany = await axios.post("http://localhost:3001/branch", {
      
      });
      setSuccess(true);
     return newCompany;
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <button onClick={() => openCloseModal()}>
      Agregar sucursal
      </button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" 
        sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Agregar sucursal</h2>
          </div>
          <Stack spacing={4}>
          <TextFieldModals
            label="Nombre"
            {...name}
          />
          <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr 1fr" },
                gap: 4,
              }}
            >
          <TextFieldModals label="Localidad"{...location} />
      
          <TextFieldModals
            label="Calle"
            {...street}
          />
          <TextFieldModals label="Número"{...number} />
          
          </Box>
          
          <TextFieldModals label="Latitud"{...coordinateLatitude}/>
        
          <TextFieldModals label="Longitud"{...coordinateLength} />
         
          <TextFieldModals label="Estado del contrato"{...active} />
          </Stack>
          <br />
          <div>
            <Button type="submit">Agregar sucursal</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
          {success ? <AlertModals />: ""}
        </Box>
      </Modal>
    </>
  );
};