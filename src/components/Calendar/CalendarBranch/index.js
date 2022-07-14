import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  styleCalendar,
  styleModalCalendar,
  styleModalCalendarButton,
  styleModalCalendarButtonCancel,
} from "./StyleCalendar";
import moment from "moment";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  DateNavigator,
  Toolbar,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Button, Box } from "../../../styles/material";
import {
  getAssignmentsBranch,
  addAssignmentsGuard,
  putAssignmentsGuard,
  deleteAssignment,
} from "../../../state/assignmentState";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getGuard, getAvailableGuards } from "../../../state/guards";
import { getRandomColor } from "../../../utils/functions";

export const CalendarBranch = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [branchCalendar, setBranchCalendar] = useState([]);
  const [branchGuardsAvailables, setBranchGuardsAvailables] = useState([]);
  const [currentAppoimentId, setCurrentAppoimentId] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const assignmentsBranch = useSelector((state) => state.branchAssignment);
  const guard = useSelector((state) => state.guard);

  const [valor, setValor] = useState("");

  useEffect(() => {
    const dateFormat = moment(currentDate).format("YYYY-MM-DD");
    dispatch(getAssignmentsBranch(params.branchId));
    dispatch(
      getAvailableGuards({ branchId: params.branchId, date: dateFormat })
    );
  }, [currentDate]);

  useEffect(() => {
    if (assignmentsBranch.length) {
      const data = JSON.parse(JSON.stringify(assignmentsBranch)); //refleja la base de datos en el calendario
      const calendar = data.map((oneGuard) => {
        //Adaptación necesaria para recibir los datos                          // y que puedan ser renderizados por la librería
        const dataGuard = {
          startDate: oneGuard.startTime,
          endDate: oneGuard.endTime,
          title: oneGuard.guardName,
          assignmentId: oneGuard.id,
          date: moment(oneGuard.startTime).format("YYYY-MM-DD"), //además de dar la informacion requerida
         
          //obtener el id de la tarea en lo que resta del código
        };
        console.log("DATAGUARD",dataGuard)
        return dataGuard;
      });
      if (Array.isArray(guard.guards)) {
        //filtrando los guardias que esten disponibles para esa sucursal
        const guardsAvailables = //y modificandolos para que esten en el formato necesario para el
          guard.guards.map((guard) => {
            // Scheduler(libreria del calendario)
            const guardAvalaible = {
              id: guard.id,
              text: `${guard.name} ${guard.lastName} - ${guard.hs} hs`,
              color: "purple",
            };
            return guardAvalaible;
          });
        setBranchGuardsAvailables(guardsAvailables);
      }
      setBranchCalendar(calendar);
    } else {
      if (Array.isArray(guard.guards)) {
        const guardsAvailables = guard.guards.map((guard) => {
          //para que igual se puedan ver los guardias disponibles
          const guardAvalaible = {
            //necesario por si no hay tareas
            id: guard.id,
            text: guard.name + " " + guard.lastName,
            color: "purple",
          };
          return guardAvalaible;
        });
        setBranchGuardsAvailables(guardsAvailables);
      }
    }
  }, [assignmentsBranch, guard]);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      dispatch(
        addAssignmentsGuard({
          date: moment(added.startDate).format("YYYY-MM-DD"),
          month: moment(added.startDate).format("MM"),
          startTime: added.startDate,
          endTime: added.endDate,
          branchId: params.branchId,
          guardId: added.guardId,
          notes: added.notes,
          adminId: 1,
        })
      ).then(() => dispatch(getAssignmentsBranch(params.branchId)));
    }
    if (changed) {
      changed = changed.undefined;
      dispatch(
        putAssignmentsGuard({
          assignmentId: currentAppoimentId,
          assignment: {
            startTime: changed.startDate,
            endTime: changed.endDate,
            guardId: changed.guardId,
          },
        })
      ).then(() => dispatch(getAssignmentsBranch(params.branchId)));
    }
  };

  const PREFIX = "Demo";

  const classes = {
    dayScaleCell: `${PREFIX}-dayScaleCell`,
  };
  const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)({
    [`&.${classes.dayScaleCell}`]: {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  });
  const formatDayScaleDate = (date, options) => {
    const momentDate = moment(date);
    const { weekday } = options;
    return momentDate.format(weekday ? "dddd" : "D");
  };
  const formatTimeScaleDate = (date) => moment(date).format("hh:mm:ss");

  const DayScaleCell = ({ formatDate, ...restProps }) => (
    <StyledWeekViewDayScaleCell
      {...restProps}
      formatDate={formatDayScaleDate}
      className={classes.dayScaleCell}
    />
  );
  const LabelComponent = (props) => {
    if (props.text === "Details") {
      return <AppointmentForm.Label {...props} text="Asignar Vigilante" />;
    } else if (props.text === "More Information") {
      return <AppointmentForm.Label {...props} text="Notas" />;
    } else if (props.text === "-") {
      return <AppointmentForm.Label {...props} />;
    }
  };

  const dataSouce = [
    {
      fieldName: "guardId",
      title: "Guard",
      instances: branchGuardsAvailables,
    },
  ];

  const InputComponent = (props) => {
    if (props.placeholder === "Title") {
      return null;
    }
    if (props.placeholder === "Notes") {
      return (
        <AppointmentForm.TextEditor
          {...props}
          type="ordinaryTextEditor"
          placeholder=""
        />
      );
    }
  };

  const BoolEditor = (props) => {
    return null;
  };

  const layoutComponent = (props) => {
    console.log("props",props)
    //Adaptación para poder obtener el id de
    if (props.appointmentMeta !== undefined) {
      //la tarea seleccionada en el calendario Scheduler
      const id = props.appointmentMeta.data.assignmentId;
      const date = props.appointmentMeta.data.date;
      setCurrentDate(date);
      setCurrentAppoimentId(id);
      return <AppointmentTooltip.Layout {...props} />;
    }
    return <AppointmentTooltip.Layout {...props} />;
  };

  const appointmentlayoutComponent=(props)=>{
    console.log("LO NECESARIO PARA TRIUNFAR",props)
    const currentDay=moment(props.value).subtract(1,"days").format("YYYY-MM-DD")
    setCurrentDate(currentDay)
    console.log("FECHAAAA",currentDate)
    return <AppointmentForm.DateEditor
    {...props}/>
  }



  const deleteOneAssignment=async()=>{
  try{ await Promise.all(dispatch(deleteAssignment(currentAppoimentId)),
    dispatch(getAssignmentsBranch(params.branchId)))}catch(err){
      console.log(err)
    }
}


  const buttonComponent = (props) => {
    console.log("PROPINA", props);
    if (props.title === "Delete") {
      setTimeout(deleteOneAssignment,1500) 
      return (
        <ConfirmationDialog.Button
          {...props}
        />
      );
    } else {
      return <ConfirmationDialog.Button {...props} />;
    }
  };


  const commandButtonComponent = (props) => {
    if (props.id === "saveButton")
      return (
        <Box sx={styleModalCalendarButton}>
          <AppointmentForm.CommandButton {...props} />
        </Box>
      );
    else if (props.id === "cancelButton")
      return (
        <Box sx={styleModalCalendarButtonCancel}>
          <AppointmentForm.CommandButton {...props} />
        </Box>
      );
  };

  const overlayProps=(props)=>{
    console.log(props)
    return <AppointmentForm.Overlay {...props}/>
  }







  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    return (
      <Box sx={styleModalCalendar}>
        <AppointmentForm.BasicLayout
          appointmentData={appointmentData}
          onFieldChange={onFieldChange}
          {...restProps}
        ></AppointmentForm.BasicLayout>
      </Box>
    );
  };

  return (
    <Box sx={styleCalendar}>
      <Scheduler data={branchCalendar}>
        <ViewState />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <MonthView
          dayScaleCellComponent={DayScaleCell}
          startDayHour={0}
          endDayHour={23}
        />
        <WeekView
          dayScaleCellComponent={DayScaleCell}
          startDayHour={0}
          endDayHour={23}
        />
        <DayView />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <ConfirmationDialog
          buttonComponent={buttonComponent}
        />
        <Appointments />
        <AppointmentTooltip
          showOpenButton
          showDeleteButton
          showCloseButton
          layoutComponent={layoutComponent}
        />
        <AppointmentForm
          // commandButtonComponent={commandButtonComponent}
          dateEditorComponent={appointmentlayoutComponent}
          booleanEditorComponent={BoolEditor}
          labelComponent={LabelComponent}
          textEditorComponent={InputComponent}
          overlayComponent={overlayProps}
        />
        <Resources data={dataSouce} mainResourceName="guardId" />
        <DragDropProvider />
      </Scheduler>
    </Box>
  );
};
