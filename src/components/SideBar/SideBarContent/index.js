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
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../../styles/material";
import UserCard from "./UserCard";
import { ListItemStyled } from "./sideBarStyles";
import {
  Apartment,
  AssignmentInd,
  QueryStats,
  SupervisedUserCircle,
  ExpandMoreIcon,
} from "../../../styles/materialIcons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const options = [
  { label: "Companias", icon: <Apartment />, url: "/home/companias" },
  { label: "Vigiladores", icon: <AssignmentInd />, url: "/home/vigiladores" },
  {
    label: "Reportes",
    icon: <QueryStats />,
    suboptions: [
      { label: "Reportes1", icon: <QueryStats />, url: "/home/reportes" },
      { label: "Reportes2", icon: <QueryStats />, url: "/home/reportes" },
    ],
  },
];

const adminOptions = [
  { label: "Admins", icon: <SupervisedUserCircle />, url: "/home/admins" },
];

const SideBarContent = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const { userInfo } = useSelector((state) => state.user);
  let indexOption = 0;
  const location = useLocation();

  useEffect(() => {
    const actualIndex = options
      .map((element) => element.label.toLowerCase())
      .indexOf(location.pathname.slice(1));
    setSelectedIndex(Number(actualIndex) + 1);
  }, [location]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const Item = ({ option, index, notSelectable }) => {
    return (
      <ListItemStyled
        key={option.label}
        selected={selectedIndex === index}
        disablePadding
        sx={{
          "&:hover": {
            backgroundColor: notSelectable ? "transparent" : "#DCD2EE",
            borderRadius: "10px",
          },
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={() => handleListItemClick(index)}
        >
          <ListItemIcon
            sx={{
              "&.MuiListItemIcon-root": {
                //color: selectedIndex === index && "#9D77E2",
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
          return option.suboptions ? (
            <Accordion
              key={option.label}
              disableGutters={true}
              elevation={0}
              sx={{
                "&.MuiAccordion-root": {
                  "&:before": {
                    backgroundColor: "transparent",
                  },
                  border: "none",
                  width: "100%",
                  marginLeft: 0,
                  paddingLeft:0
                },
              }}
            >
              <AccordionSummary
                sx={{
                  margin:0,
                  paddingLeft:"1px",
                  height: "45px",
                  borderRadius: "10px",
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Item
                  notSelectable={true}
                  option={option}
                  index={indexOption}
                />
              </AccordionSummary>
              <AccordionDetails>
                {option.suboptions.map((suboption) => {
                  return (
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      key={suboption.label}
                      to={suboption.url}
                    >
                      <Item option={suboption} index={indexOption} />
                    </Link>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          ) : (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              key={option.label}
              to={option.url}
            >
              <Item option={option} index={indexOption} />
            </Link>
          );
        })}
        {userInfo?.superAdmin && (
          <>
            <Divider textAlign="left">
              <Typography variant="body2" fontWeight="400" mb={2} mt={2}>
                ADMIN
              </Typography>
            </Divider>
            {adminOptions.map((option, i) => {
              indexOption++;
              return (
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={i}
                  to={option.url}
                >
                  <Item key={i} option={option} index={indexOption} />
                </Link>
              );
            })}
          </>
        )}
      </List>
    </div>
  );
};

export default SideBarContent;
