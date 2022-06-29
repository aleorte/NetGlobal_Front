import { Modal, Button, Box } from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import useChange from "../../../utils/useChange";
import { styleModal } from "../../../utils/modelUtils";
import TextFieldModals from "../../../commons/TextFieldStyled/TextFieldModal";
import AlertModals from "../../../commons/Alert/AlertModals";

export const AddCompany = () => {
  const [stateModal, setStateModal] = useState(false);
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
      const newCompany = await axios.post("http://localhost:3001/company", {
        cuit: cuit.state,
        legalName: legalName.state,
        legalAdress: legalAdress.state,
        contractStartDate: contractStartDate.state,
        contractEndDate: contractEndDate.state,
      });
      setSuccess(true);
     return newCompany;
    } catch (err) {
      console.log(err);

    }
  };

  return (
    <>
      <button onClick={() => openCloseModal()}>Agregar compañía</button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Agregar compañía</h2>
          </div>

          <TextFieldModals label="CUIT" {...cuit} />
          <br />
          <TextFieldModals label="Nombre legal" {...legalName} />
          <br />
          <TextFieldModals label="Dirección legal" {...legalAdress} />
          <br />
          <TextFieldModals
            label="Fecha de inicio de contrato"
            {...contractStartDate}
          />
          <br />
          <TextFieldModals
            label="Fecha de fin del contrato"
            {...contractEndDate}
          />
          <br />
          <br />
          <div>
            <Button type="submit">Agregar compañía</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
          {success ? <AlertModals />: ""}
        </Box>
      </Modal>
    </>
  );
};
