import { createReducer, createAction } from "@reduxjs/toolkit";

function createData(id, cuit, name, status, inicio, final, direccion) {
    return {
      id,
      cuit,
      name,
      status,
      inicio,
      final,
      direccion,
    };
  }
  
  const data = [
    createData(
      "1",
      "567432456",
      "Grido",
        true,
      "17/03/2019",
      "11/02/2024",
      [-27.450567476301234, -58.98359440378527]
    ),
    createData(
      "2",
      "567432456",
      "Carrefour",
      true,
      "11/11/2012",
      "11/02/2026",
      [-27.453060696309066, -58.9802662692736]
    ),
    createData(
      "3",
      "567432456",
      "Ford",
      false,
      "11/11/2014",
      "11/02/2023",
      [-27.45267510935069, -58.98386579347923]
    ),
    createData(
      "4",
      "567432456",
      "Coto",
      false,
      "11/11/2011",
      "11/02/2018",
      [-27.453289634571053, -58.985504028511365]
    ),
    createData(
      "5",
      "567432456",
      "Libertad",
      true,
      "11/11/2010",
      "11/02/2017",
      [-27.449377639440048, -58.98110287339204]
    ),
    createData(
      "6",
      "567432456",
      "Otra Empresa",
      false,
      "11/11/2010",
      "11/02/2027",
      [-27.449769939943373, -58.989421008995755]
    ),
  ];

export const getCompanies = createAction("GET_COMPANIES")

const companyReducer = createReducer({companies:data,selectedCompany:{...data[0],count:5,branches:["","","",""]}},{
    [getCompanies]: (state,action)=>{

    }
}
  
);

export default companyReducer;