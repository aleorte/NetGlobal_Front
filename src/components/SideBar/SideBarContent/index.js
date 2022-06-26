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
import { EmailIcon, LockIcon} from "../../../styles/materialIcons"
import UserCard from "./UserCard";
import { Apartment,AssignmentInd,QueryStats,SupervisedUserCircle } from '../../../styles/materialIcons'

const user = {name:"Travis Howard",image:"https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg"}

const options = [
  {label:"Companias",icon:<Apartment/>},
  {label:"Vigiladores",icon:<AssignmentInd/>},
  {label:"Usuarios",icon:<SupervisedUserCircle/>},
  {label:"Reportes",icon:<QueryStats/>}
]

const SideBarContent = () => {
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
          <ListItem key={option.label} disablePadding >
            <ListItemButton>
              <ListItemIcon>
                {option.icon}
              </ListItemIcon>
              <ListItemText primary={<Typography >{option.label}</Typography>} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </div>
  );
};

export default SideBarContent;
