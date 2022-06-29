import { Modal,TextField, Button, Box } from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChange from "../../../utils/useChange";
import TextFieldStyled from "../../../commons/TextFieldStyled";
import {handleModel,styleModal} from "../../../utils/modelUtils";


export const EditBranch = () => {
  const [stateModal, setStateModal] = useState(false);
  const navigate = useNavigate();
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
 

  return (
    <>
      <button onClick={() => openCloseModal()}>
      Editar sucursal
      </button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" 
        sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Editar sucursal</h2>
          </div>
          <TextFieldStyled
            label="Nombre"
            {...name}
          />
          <br />
          <TextFieldStyled label="Número"{...number} />
          <br />
          <TextFieldStyled
            label="Calle"
            height="70px"
            {...street}
          />
          <br />
          <TextFieldStyled label="Localidad"{...location} />
          <br />
          <TextFieldStyled label="Latitud"{...coordinateLatitude}/>
          <br />
          <TextFieldStyled label="Longitud"{...coordinateLength} />
          <br />
          <TextFieldStyled label="Estado del contrato"{...active} />
          <br />
          <br />
          <div>
            <Button type="submit">Editar sucursal</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};