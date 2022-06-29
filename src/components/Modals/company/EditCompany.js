import { Modal, TextField, Button, Box } from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChange from "../../../utils/useChange";
import TextFieldStyled from "../../../commons/TextFieldStyled";
import {styleModal } from "../../../utils/modelUtils";

export const EditCompany = ({idCompany}) => {
  const [stateModal, setStateModal] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [mesagge, setMesagge] = useState("");
  const cuit = useChange("");
  const legalName = useChange("");
  const legalAdress = useChange("");
  const contractStartDate = useChange("");
  const contractEndDate = useChange("");

  const openCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleModel = async (e) => {
    e.preventDefault();
    try {
      setSuccess(false)
      const editCompany = await axios.put(`http://localhost:3001/company/${idCompany}`, {
        cuit: cuit.state,
        legalName: legalName.state,
        legalAdress: legalAdress.state,
        contractStartDate: contractStartDate.state,
        contractEndDate: contractEndDate.state,
      });
      setSuccess(true);
     return editCompany;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={() => openCloseModal()}>
        Editar compañía
      </button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Editar compañía</h2>
          </div>
          <TextFieldStyled label="CUIT" {...cuit} />
          <br />
          <TextFieldStyled label="Nombre legal" height="70px" {...legalName} />
          <br />
          <TextFieldStyled label="Dirección legal" {...legalAdress} />
          <br />
          <TextFieldStyled
            label="Fecha de inicio de contrato"
            {...contractStartDate}
          />
          <br />
          <TextFieldStyled
            label="Fecha de fin del contrato"
            {...contractEndDate}
          />
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
