import React, { useState } from "react";
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
  if(props.id==="saveButton")
  return (
    <Box sx={styleModalCalendarButton}>
      <AppointmentForm.CommandButton {...props} />
    </Box>
  );
  else if(props.id==="cancelButton")
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

export const Calendar = () => {
  return (
    <Box sx={styleCalendar}>
      <Scheduler data={SchedulerData}>
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
