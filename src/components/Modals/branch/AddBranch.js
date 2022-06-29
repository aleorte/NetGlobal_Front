import { Modal, Button, Box } from "../../../styles/material";
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
          <TextFieldModals
            label="Nombre"
            {...name}
          />
          <br />
          <TextFieldModals label="Número"{...number} />
          <br />
          <TextFieldModals
            label="Calle"
            height="70px"
            {...street}
          />
          <br />
          <TextFieldModals label="Localidad"{...location} />
          <br />
          <TextFieldModals label="Latitud"{...coordinateLatitude}/>
          <br />
          <TextFieldModals label="Longitud"{...coordinateLength} />
          <br />
          <TextFieldModals label="Estado del contrato"{...active} />
          <br />
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