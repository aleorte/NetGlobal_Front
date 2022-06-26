import React from "react";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "../../../styles/material";
import UserCard from "./UserCard";
import { ListItemStyled } from "./sideBarStyles";

const user = {name:"Travis Howard",image:"https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg"}

const SideBarContent = ({options}) => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <UserCard user={user}/>
        </ListItem>
        <Divider textAlign="left">
          <Typography variant="body2" fontWeight="400" mb={2} mt={2}> GENERAL </Typography>
        </Divider>
        {options.map((option, index) => (
          <ListItemStyled key={option.label} selected={selectedIndex === index} disablePadding >
            <ListItemButton onClick={() => handleListItemClick(index)}>
              <ListItemIcon sx={{"&.MuiListItemIcon-root":{color:selectedIndex === index && "#9D77E2"},pl:2}}>
                {option.icon}
              </ListItemIcon>
              <ListItemText primary={<Typography>{option.label}</Typography>} />
            </ListItemButton>
          </ListItemStyled>
        ))}
      </List>
      
    </div>
  );
};

export default SideBarContent;
