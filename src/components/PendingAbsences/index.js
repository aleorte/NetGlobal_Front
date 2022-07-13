import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "../../styles/material";
import {
  CancelOutlinedIcon,
  CheckCircleOutlineOutlinedIcon,
  FactCheckOutlinedIcon
} from "../../styles/materialIcons";
import { TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { setInactive,getPending,getPast } from "../../state/inactive";

const PendingAbsences = ({render}) => {
  const { pending } = useSelector((state) => state.inactive);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPending())
  },[])

  function renderItem({ item, handleInactive }) {
    return (
      <ListItem
        divider
        secondaryAction={
          <>
            <IconButton
              edge="end"
              aria-label="delete"
              title="Aceptar"
              onClick={() => handleInactive(item, "APPROVED")}
              sx={{ mr: 2 }}
            >
              <CheckCircleOutlineOutlinedIcon
                color="success"
                sx={{ fontSize: "30px", color: "green" }}
              />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              title="Rechazar"
              onClick={() => handleInactive(item, "REJECTED")}
            >
              <CancelOutlinedIcon color="error" sx={{ fontSize: "30px" }} />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar
            alt={item.guards[0].name}
            src={item.guards[0].image}
          />
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{}}
          primary={
            <Typography fontWeight="bold"> {item.guards[0].lastName + " " + item.guards[0].name} </Typography>
          }
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.startDate + " | " + item.endDate}
              </Typography>
              <br />
              {item.detail}
            </>
          }
        ></ListItemText>
      </ListItem>
    );
  }

  const handleInactive = (item, state) => {
    dispatch(setInactive({ inactiveId: item.id, state }))
    .then(()=>{dispatch(getPast())})
  };

  return (
    
    <Box>
      <Grid my={2} display="flex" flexDirection="column">
        <div>
          {pending.length===0 ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <FactCheckOutlinedIcon sx={{fontSize:"100px",color:"lightgray"}}/>
              <Typography variant="h6" sx={{color:"gray"}}> No hay peticiones pendientes </Typography>
            </Box>
          ) : (
            <Box sx={{ mt: 1 }}>
              <List sx={{ bgcolor: "background.paper" }}>
                <TransitionGroup>
                  {pending.map((item) => (
                    <Collapse key={item.id}>
                      {renderItem({ item, handleInactive })}
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            </Box>
          )}
        </div>
      </Grid>
    </Box>
  );
};

export default PendingAbsences;
