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
  getAssignmentsGuard,
  addAssignmentsGuard,
  putAssignmentsGuard,
  deleteAssignment,
} from "../../../state/assignmentState";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getGuard, getAvailableGuards } from "../../../state/guards";
import { getRandomColor } from "../../../utils/functions";


export const CalendarGuard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [guardCalendar, setGuardCalendar] = useState([]);
  const [branchGuardsAvailables, setBranchGuardsAvailables] = useState([]);
  const [currentAppoimentId, setCurrentAppoimentId] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const assignmentsGuard = useSelector((state) => state.branchAssignment);
  const guard = useSelector((state) => state.guard);

  const [valor, setValor] = useState("");

  useEffect(() => {
    dispatch(getAssignmentsGuard(params.guardId));
    dispatch(getGuard(params.guardId));
  }, []);


  console.log("AAAAA",assignmentsGuard)
  useEffect(() => {
    if (assignmentsGuard.length) {
      const data = JSON.parse(JSON.stringify(assignmentsGuard)); //refleja la base de datos en el calendario
      const calendar = data.map((currentGuard) => {                   //Adaptación necesaria para recibir los datos
        console.log("HOLAA", currentGuard);                           // y que puedan ser renderizados por la librería
        const dataGuard = {
          startDate: currentGuard.startTime,
          endDate: currentGuard.endTime,
          title: currentGuard.name,
          assignmentId: currentGuard.id,
          date: moment(currentGuard.startTime).format("YYYY-MM-DD"), //además de dar la informacion requerida
          state: currentGuard.state,                                 //obtener el id de la tarea en lo que resta del código
        };
        return dataGuard;
      })
      console.log("DATOSSSS",calendar)
      setGuardCalendar(calendar);
    }                  
  }, [assignmentsGuard, guard]);

  
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
      return <AppointmentForm.Label {...props} text="Agregar Vigilante" />;
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


  const buttonComponent = (props) => {
    console.log("PROPPS", props);
    if (props.title === "Delete") {
      return (
        <ConfirmationDialog.Button
          {...props}
          onClick={dispatch(deleteAssignment(currentAppoimentId))}
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
      <Scheduler data={guardCalendar}>
        <ViewState />
        <EditingState/>
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
        <Appointments />
        <AppointmentTooltip
          showCloseButton
        />
        <DragDropProvider />
      </Scheduler>
    </Box>
  );
};
