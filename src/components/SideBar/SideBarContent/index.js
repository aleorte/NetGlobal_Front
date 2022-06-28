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

const user = {
  name: "Alguna fulana",
  image:
    "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg",
};

const SideBarContent = ({ options,adminOptions }) => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  let indexOption = 0

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const Item = ({option,index}) => {
    return (
      <ListItemStyled
        key={option.label}
        selected={selectedIndex === index}
        disablePadding
      >
        <ListItemButton onClick={() => handleListItemClick(index)}>
          <ListItemIcon
            sx={{
              "&.MuiListItemIcon-root": {
                color: selectedIndex === index && "#9D77E2",
              },
              pl: 2,
            }}
          >
            {option.icon}
          </ListItemIcon>
          <ListItemText primary={<Typography>{option.label}</Typography>} />
        </ListItemButton>
      </ListItemStyled>
    );
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <UserCard user={user} />
        </ListItem>
        <Divider textAlign="left">
          <Typography variant="body2" fontWeight="400" mb={2} mt={2}>
            GENERAL
          </Typography>
        </Divider>
        {options.map((option,i) => { 
          indexOption++
          return <Item key={i} option={option} index= {indexOption}/>
        })}
        <Divider textAlign="left">
          <Typography variant="body2" fontWeight="400" mb={2} mt={2}>
            ADMIN
          </Typography>
        </Divider>
        {adminOptions.map((option,i) => {
          indexOption++
          return <Item key={i} option={option} index={indexOption}/>
        })}
      </List>
    </div>
  );
};

export default SideBarContent;
