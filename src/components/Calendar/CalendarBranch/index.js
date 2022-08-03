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
  Resources,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Box } from "../../../styles/material";
import {
  getAssignmentsBranch,
  addAssignmentsGuard,
  putAssignmentsGuard,
  deleteAssignment,
} from "../../../state/assignmentState";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { getAvailableGuards } from "../../../state/guards";

export const CalendarBranch = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [branchCalendar, setBranchCalendar] = useState([]);
  const [branchGuardsAvailables, setBranchGuardsAvailables] = useState([]);
  const [currentAppoimentId, setCurrentAppoimentId] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const assignmentsBranch = useSelector((state) => state.branchAssignment);
  const guard = useSelector((state) => state.guard);

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
      const calendar = data.map((oneGuard) => {                   //Adaptación necesaria para recibir los datos   
        const dataGuard = {                                       // y que puedan ser renderizados por la librería
          startDate: oneGuard.startTime,
          endDate: oneGuard.endTime,
          title: oneGuard.guardName,
          assignmentId: oneGuard.id,
          date: moment(oneGuard.startTime).format("YYYY-MM-DD"),  //además de dar la informacion requerida
        };                                                        //obtener el id de la tarea en lo que resta del código
        return dataGuard;
      });
      setBranchCalendar(calendar);
    }
  }, [assignmentsBranch]);

  useEffect(()=>{
    if (Array.isArray(guard.guards)) {  //filtrando los guardias que esten disponibles para esa sucursal
      const guardsAvailables =          //y modificandolos para que esten en el formato necesario para el
        guard.guards.map((guard) => {   // Scheduler(libreria del calendario)
          const guardAvalaible = {
            id: guard.id,
            text: `${guard.name} ${guard.lastName} - ${guard.hs} hs asignadas`,
            color: "purple",
          };
          return guardAvalaible;
        });
      setBranchGuardsAvailables(guardsAvailables);
    }
   else {
    if (Array.isArray(guard.guards)) {
      const guardsAvailables = guard.guards.map((guard) => {//para que igual se puedan ver los guardias disponibles
        const guardAvalaible = {                            //necesario por si no hay tareas
          id: guard.id,
          text: guard.name + " " + guard.lastName,
          color: "purple",
        };
        return guardAvalaible;
      });
      setBranchGuardsAvailables(guardsAvailables);
    }
  }},[guard])

  const commitChanges = ({ added, changed, deleted }) => {          //funcion que permite agregar una tarea y modificarla
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
  const formatDayScaleDate = (date, options) => {                           //funciones para dar formato a la forma en que se visualizan los nombres de los dias
    const momentDate = moment(date);
    const { weekday } = options;
    return momentDate.format(weekday ? "dddd" : "D");
  };

  const DayScaleCell = ({ formatDate, ...restProps }) => (
    <StyledWeekViewDayScaleCell
      {...restProps}
      formatDate={formatDayScaleDate}
      className={classes.dayScaleCell}
    />
  );
  const LabelComponent = (props) => {                                             //personalizando el formulario para agregar una tarea
    if (props.text === "Details") {
      return <AppointmentForm.Label {...props} text="Asignar Vigilante" />;
    } else if (props.text === "More Information") {
      return <AppointmentForm.Label {...props} text="Notas" />;
    } else if (props.text === "-") {
      return <AppointmentForm.Label {...props} />;
    }
  };

  const dataSouce = [                                  //dando el formato requerido para que las tareas 
    {                                                  //se vean reflejadas en el selected del formulario(appoimentForm)
      fieldName: "guardId",
      title: "Vigilante",
      instances: branchGuardsAvailables,
    },
  ];

  const InputComponent = (props) => {            //modificando el appoiment form
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

  const layoutComponent = (props) => {                    //Adaptación para poder obtener el id de
    if (props.appointmentMeta !== undefined) {            //la tarea seleccionada en el calendario Scheduler a la hora de editar
      const id = props.appointmentMeta.data.assignmentId; // const date = props.appointmentMeta.data.date;// setCurrentDate(date);
      setCurrentAppoimentId(id);
      return <AppointmentTooltip.Layout {...props} />;
    }
    return <AppointmentTooltip.Layout {...props} />;
  };



const currentDateFun=async(value)=>{
  const currentDay=await moment(value).subtract(1,"days").format("YYYY-MM-DD")
    setCurrentDate(currentDay)
}

  const appointmentlayoutComponent=(props)=>{                   //solución para que el calendario scheduler no se buguee
    setTimeout(currentDateFun(props.value),3000)                // ya que hay que tener cuidado al editarlo, para no romperlo/bugearlo
    return <AppointmentForm.DateEditor
    {...props}/>
  }


  const deleteOneAssignment=async()=>{
  try{ dispatch(deleteAssignment(currentAppoimentId))
    dispatch(getAssignmentsBranch(params.branchId))}catch(err){
      console.log(err)
    }
}


  const buttonComponent = (props) => {
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

  const overlayProps=(props)=>{
    console.log(props)
    return <AppointmentForm.Overlay {...props}/>
  }


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
          dateEditorComponent={appointmentlayoutComponent}
          booleanEditorComponent={BoolEditor}
          labelComponent={LabelComponent}
          textEditorComponent={InputComponent}
          overlayComponent={overlayProps}
        />
        <Resources data={dataSouce} mainResourceName="guardId" />
      </Scheduler>
    </Box>
  );
};
