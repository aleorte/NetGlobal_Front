import { Modal, Button, Box, Stack,TextField} from "../../../styles/material";
import axios from "axios";
import React, { useState } from "react";
import useChange from "../../../utils/useChange";
import { styleModal } from "../../../utils/modelUtils";
import TextFieldModals from "../../../commons/TextFieldStyled/TextFieldModal";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const AddAdmin = () => {
  const [stateModal, setStateModal] = useState(false);
  const email = useChange("");
  const navigate=useNavigate()

  const openCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleModel = async (e) => {
    e.preventDefault();
      axios.post("http://localhost:3001/register/admin", {
       email:email.state
      })
      .then(res=>res.data)
      .then(()=>{
          swal({tittle:"Creada", text:"Administrador creado con éxito", icon:"success"})
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
      <button onClick={() => openCloseModal()}>Agregar Administrador</button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <Box component="form" sx={styleModal} onSubmit={handleModel}>
          <div>
            <h2>Agregar Administrador</h2>
          </div>
          <Stack spacing={4}>
            
              <TextFieldModals
                fullWidth
                label="Correo electrónico"
                {...email}
              />
          </Stack>
          <br />
          <div>
            <Button type="submit">Agregar Administrador</Button>
            <Button onClick={() => openCloseModal()}>Cerrar</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};