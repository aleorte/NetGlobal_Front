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
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Button, Box } from "../../styles/material";
import { getAssignamentsBranch } from "../../state/assignamentState";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getGuard } from "../../state/guards";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

const SchedulerData = [
  {
    startDate: "2022-07-05T09:45",
    endDate: "2022-07-05T19:45",
    title: "Tarea",
  },
  {
    startDate: "2022-07-07T10:45",
    endDate: "2022-07-07T22:30",
    title: "Codear",
  },
];

export const Calendar = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [branchCalendar, setBranchCalendar] = useState([]);
  const [nameGuard, setNameGuard] = useState({});
  const [asignedGuards, setAsignedGuards] = useState([]);

  const assignamentsBranch = useSelector((state) => state.branchAssignament);
  const guard = useSelector((state) => state.guard);

  useEffect(() => {
    dispatch(getAssignamentsBranch(params.branchId));
  }, []);

  useEffect( () => {
    const calendar=[]
    const data = JSON.parse(JSON.stringify(assignamentsBranch));
    async function asyncFn(){
      const guards = await Promise.all(
        data.map((oneGuard) => dispatch(getGuard(oneGuard.guardId)))
      );
      for (let i = 0; i < data.length; i++) {
        const startedDate = data[i].startTime;
        const endedDate = data[i].endTime;
        const guardName=guards[i].payload.name+" "+guards[i].payload.lastName
        calendar.push({
          startDate: startedDate,
          endDate: endedDate,
          title:guardName,
        });
        setBranchCalendar(calendar);}
    }
    asyncFn()
  }, [assignamentsBranch]);


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

  const InputComponent = (props) => {
    if (props.placeholder === "Title") {
      return <AppointmentForm.Select {...props} />;
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

  const editOverlay = ({ fullSize, ...restProps }) => {
    return (
      <AppointmentForm.Overlay
        {...restProps}
        fullSize={false}
      ></AppointmentForm.Overlay>
    );
  };

  return (
    <Box sx={styleCalendar}>
      <Scheduler data={branchCalendar}>
        <ViewState />
        <EditingState />
        <EditRecurrenceMenu />
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
        <AppointmentTooltip showCloseButton showOpenButton />
        <AppointmentForm
          commandButtonComponent={commandButtonComponent}
          overlayComponent={editOverlay}
          basicLayoutComponent={BasicLayout}
          booleanEditorComponent={BoolEditor}
          labelComponent={LabelComponent}
          textEditorComponent={InputComponent}
        />
        <Resources />
      </Scheduler>
    </Box>
  );
};
