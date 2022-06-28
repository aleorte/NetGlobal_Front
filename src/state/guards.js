import { createReducer, createAction } from "@reduxjs/toolkit";

function createData(id, cuit, name,lastName, email, direccion) {
    return {
      id,
      cuit,
      name,
      lastName,
      email,
      direccion,
    };
  }
  
  const data = [
    createData(
      "1",
      "123224124",
      "Sebastian",
      "Villa",
      "sevilla@gmail.com",
      [-27.450567476301234, -58.98359440378527]
    ),
    createData(
        "2",
        "123224124",
        "Dario",
        "Benedetto",
        "dbenedetto@gmail.com",
      [-27.453060696309066, -58.9802662692736]
    ),
    createData(
      "3",
      "567432456",
      "Exequiel",
      "Zeballos",
      "ezeballos@gmail.com",
      [-27.45267510935069, -58.98386579347923]
    ),
  ];

export const getCompanies = createAction("GET_COMPANIES")

const guardsReducer = createReducer({guards:data,selectedGuard:{...data[0]}},{
    [getCompanies]: (state,action)=>{

    }
}
  
);

export default guardsReducer;