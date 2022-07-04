import React, { useEffect } from "react";
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
import {
  Apartment,
  AssignmentInd,
  QueryStats,
  SupervisedUserCircle,
} from "../../../styles/materialIcons";
import { Link } from 'react-router-dom'
import { useLocation } from "react-router";

const options = [
  { label: "Companias", icon: <Apartment />,url:"/home/companias"},
  { label: "Vigiladores", icon: <AssignmentInd />,url:"/home/vigiladores" },
  { label: "Reportes", icon: <QueryStats />,url:"/home/reportes" },
];

const adminOptions = [{ label: "Usuarios", icon: <SupervisedUserCircle />,url:"/usuarios" }];

const SideBarContent = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  let indexOption = 0;
  const location = useLocation()

  useEffect(()=>{
    const actualIndex = options.map(element=>element.label.toLowerCase()).indexOf(location.pathname.slice(1))
    setSelectedIndex(Number(actualIndex)+1)
  },[location])

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const Item = ({ option, index }) => {
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
      <List>
        <ListItem>
          <UserCard />
        </ListItem>
        <Divider textAlign="left">
          <Typography variant="body2" fontWeight="400" mb={2} mt={2}>
            GENERAL
          </Typography>
        </Divider>
        {options.map((option, i) => {
          indexOption++;
          return (
            <Link style={{textDecoration:"none",color:"inherit"}} key={i} to={option.url}> 
              <Item option={option} index={indexOption}/> 
            </Link>
          )
        })}
        <Divider textAlign="left">
          <Typography variant="body2" fontWeight="400" mb={2} mt={2}>
            ADMIN
          </Typography>
        </Divider>
        {adminOptions.map((option, i) => {
          indexOption++;
          return <Item key={i} option={option} index={indexOption} />;
        })}
      </List>
    </div>
  );
};

export default SideBarContent;
