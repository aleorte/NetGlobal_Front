import React, { useEffect } from "react";
import { getPast } from "../../state/inactive";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import StatusAbsence from "../../commons/StatusAbsence";

const PastAbsences = () => {
  const { past } = useSelector((state) => state.inactive);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPast());
  }, []);

  const columns = [
    {
      field: "cuil",
      headerName: "CUIL",
      flex:1,
      minWidth:80,
      valueGetter: (params) => `${params.row.guards[0].cuil || ""}`,
    },
    {
      field: "fullName",
      headerName: "NOMBRE",
      flex:1,
      minWidth:150,
      valueGetter: (params) =>
        `${params.row.guards[0].name || ""} ${
          params.row.guards[0].lastName || ""
        }`,
    },
    {
      field: "state",
      headerName: "ESTADO",
      minWidth:150,
      renderCell: (params) => <StatusAbsence status={params.row.state === "APPROVED"} />
    },
    {
      field: "startDate",
      headerName: "FECHA INICIO",
      flex:1,
      minWidth:150,
      valueGetter: (params) => `${params.row.startDate || ""}`,
    },
    {
      field: "endDate",
      headerName: "FECHA FINAL",
      flex:1,
      minWidth:150,
      valueGetter: (params) => `${params.row.endDate || ""}`,
    },
    {
      field: "detail",
      headerName: "DETALLE",
      flex:1,
      minWidth:150,
      valueGetter: (params) => `${params.row.detail || ""}`,
    },
  ];

  return (
    <DataGrid
        sx={{width:"100%"}}
        autoHeight
        rows={past}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableVirtualization
    /> 
  );
};

export default PastAbsences;
