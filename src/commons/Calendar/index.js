import React,{ useState } from "react";
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { ViewState,EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, MonthView,WeekView,DayView ,DateNavigator,Toolbar,ViewSwitcher,Appointments ,AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

const PREFIX = 'Demo';

const classes = {
  dayScaleCell: `${PREFIX}-dayScaleCell`,
};
const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)({
  [`&.${classes.dayScaleCell}`]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
const formatDayScaleDate = (date, options) => {
  const momentDate = moment(date);
  const { weekday } = options;
  return momentDate.format(weekday ? 'dddd' : 'D');
};
const formatTimeScaleDate = date => moment(date).format('hh:mm:ss');

const DayScaleCell = ((
  { formatDate, ...restProps },
) => (
  <StyledWeekViewDayScaleCell
    {...restProps}
    formatDate={formatDayScaleDate}
    className={classes.dayScaleCell}
  />
));



export const Calendar = ()=>{
    return (
        <Scheduler>
            <ViewState/>
            <EditingState/>
            <IntegratedEditing/>
            <MonthView 
            dayScaleCellComponent={DayScaleCell}/>
            <WeekView/>
            <DayView/>
            <Toolbar />
            <DateNavigator />
          <ViewSwitcher />
            <Appointments/>
            <AppointmentForm/>
        </Scheduler>
    
      );
    };
