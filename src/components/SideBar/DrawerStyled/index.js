import React from "react";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "../../../styles/material";
import { EmailIcon, LockIcon} from "../../../styles/materialIcons"
import UserCard from "./UserCard";

const user = {name:"Travis Howard",image:"https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg"}

const DrawerStyled = () => {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <UserCard user={user}/>
        </ListItem>
        {["Companias", "Sucursales", "Vigiladores", "Reportes"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <LockIcon /> : <EmailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <LockIcon /> : <EmailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DrawerStyled;
