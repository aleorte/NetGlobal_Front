import { Modal, TextField, Button, Box } from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChange from "../../../utils/useChange";
import TextFieldStyled from "../../../commons/TextFieldStyled";
import {handleModel,styleModal} from "../../../utils/modelUtils";

export const EditGuard = () => {
  const [stateModal, setStateModal] = useState(false);
  const navigate = useNavigate();
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


  return (
    <>
      <button className="btn btn-dark" onClick={() => openCloseModal()}>
      Editar Vigilante
      </button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Editar Vigilante</h2>
          </div>

          <TextFieldStyled label="CUIT" {...name} />
          <br />
          <TextFieldStyled label="Nombre legal" height="70px" {...lastName} />
          <br />
          <TextFieldStyled label="Dirección legal" {...cuil} />
          <br />
          <TextFieldStyled label="Fecha de inicio de contrato" {...email} />
          <br />
          <TextFieldStyled label="Número" {...number} />
          <br />
          <TextFieldStyled label="Calle" height="70px" {...street} />
          <br />
          <TextFieldStyled label="Localidad" {...location} />
          <br />
          <TextFieldStyled label="Latitud" {...coordinateLatitude} />
          <br />
          <TextFieldStyled label="Longitud" {...coordinateLength} />
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
