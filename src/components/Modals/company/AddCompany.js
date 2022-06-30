import { Modal, Button, Box, Stack } from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import useChange from "../../../hooks/useChange";
import { styleModal } from "../../../utils/modelUtils";
import TextFieldModals from "../../../commons/TextFieldStyled/TextFieldModal";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const AddCompany = () => {
  const [stateModal, setStateModal] = useState(false);
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cuit = useChange("");
  const legalName = useChange("");
  const legalAdress = useChange("");
  const contractStartDate = useChange("");
  const contractEndDate = useChange("");
  const logo = useChange("");


  const openCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleModel = async (e) => {
    e.preventDefault();
      axios.post("http://localhost:3001/company", {
        cuit: cuit.state,
        legalName: legalName.state,
        legalAdress: legalAdress.state,
        contractStartDate: contractStartDate.state,
        contractEndDate: contractEndDate.state,
        logo: logo.state,
      })
      .then(res=>res.data)
      .then(()=>{
          swal({tittle:"Creada", text:"Compañía agregada", icon:"success"})
          navigate("/home")
          openCloseModal()
      })
      .catch(err=>{
        swal({tittle:"Algo salió mal", text:"Algo salió mal", icon:"error"})
        console.log(err)
      })
        
  }

    
   

  return (
    <>
      <button onClick={() => openCloseModal()}>Agregar compañía</button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box
          component="form"
          sx={styleModal}
          onSubmit={handleModel}
        >
          <div>
            <h2>Agregar compañía</h2>
          </div>
          <Stack spacing={4}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 4,
              }}
            >
              <TextFieldModals
                label="Nombre Legal"
                name="name"
                {...register("name", { required: "Required" })}
                {...legalName}
               
              />
              <TextFieldModals label="CUIT" {...cuit} />
              <TextFieldModals
                label="Fecha de inicio de contrato"
                {...contractStartDate}
              />
              <TextFieldModals
                label="Fecha de fin del contrato"
                {...contractEndDate}
              />
            </Box>
            <TextFieldModals label="Dirección legal" {...legalAdress} />

            <TextFieldModals label="Logo" {...logo} />
          </Stack>
          <br />
          <br />
          <br />
          <div>
            <Button type="submit">Agregar compañía</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
