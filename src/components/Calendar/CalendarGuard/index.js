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
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Box } from "../../../styles/material";
import {
  getAssignmentsGuard,
} from "../../../state/assignmentState";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { getGuard} from "../../../state/guards";
import { getGuardInactives } from "../../../state/inactive";

export const CalendarGuard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [guardCalendar, setGuardCalendar] = useState([]);
  const assignmentsGuard = useSelector((state) => state.branchAssignment);
  const { guard } = useSelector((state) => state.guard);
  const { guardInactives } = useSelector((state) => state.inactive);

  useEffect(() => {
    dispatch(getGuardInactives(params.guardId));
    dispatch(getAssignmentsGuard(params.guardId));
    dispatch(getGuard(params.guardId));
  }, []);

  useEffect(() => {
    if (assignmentsGuard.length && guardInactives.guard) {
      const inactiveGuardData = JSON.parse(JSON.stringify(guardInactives));
      const data = JSON.parse(JSON.stringify(assignmentsGuard));
      const calendarInactive = inactiveGuardData.inactivities.map(
        (inactive) => {
          if (inactive.state === "APPROVED") {
            const dataInactive = {
              startDate: inactive.startDate,
              endDate: inactive.endDate,
              title: "LICENCIA",
              state: inactive.state,
            };
            return dataInactive;
          } else return "";
        }
      );                                                       //refleja la base de datos en el calendario
      const guardAppoiments = data.map((currentGuard) => {     //Adaptación necesaria para recibir los datos
        const dataGuard = {                                    // y que puedan ser renderizados por la librería
          startDate: currentGuard.startTime,
          endDate: currentGuard.endTime,
          title: `${moment(currentGuard.startTime).format(
            "HH-mm"
          )} Hs - ${moment(currentGuard.endTime).format("HH-mm")}Hs`,
          assignmentId: currentGuard.id,
          date: moment(currentGuard.startTime).format("YYYY-MM-DD"),
          state: currentGuard.state,                                 //además de dar la informacion requerida
        };                                                           //obtener el id de la tarea en lo que resta del código
        return dataGuard;
      });
      const calendar = guardAppoiments.concat(calendarInactive);
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
  const DayScaleCell = ({ formatDate, ...restProps }) => (
    <StyledWeekViewDayScaleCell
      {...restProps}
      formatDate={formatDayScaleDate}
      className={classes.dayScaleCell}
    />
  );
  const appoimentComponent = ({ children, style, ...restProps }) => {
    if (restProps.data.state === "COMPLETE") {
      return (
        <Appointments.Appointment
          style={{
            ...style,
            backgroundColor: "#77dd77",
          }}
          {...restProps}
        >
          {children}
        </Appointments.Appointment>
      );
    } else if (restProps.data.state === "APPROVED") {
      return (
        <Appointments.Appointment
          style={{
            ...style,
            backgroundColor: "#FF0800",
          }}
          {...restProps}
        >
          {children}
        </Appointments.Appointment>
      );
    } else {
      return (
        <Appointments.Appointment {...restProps} {...style}>
          {children}
        </Appointments.Appointment>
      );
    }
  };

  return (
    <Box sx={styleCalendar}>
      <Scheduler data={guardCalendar}>
        <ViewState />
        <EditingState />
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
        <Appointments appointmentComponent={appoimentComponent} />
        <AppointmentTooltip showCloseButton />
        <DragDropProvider />
      </Scheduler>
    </Box>
  );
};
