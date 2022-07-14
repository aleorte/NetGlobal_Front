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
  FactCheckOutlinedIcon,
} from "../../../styles/materialIcons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const adminOptions = [
  { label: "Compañias", icon: <Apartment />, url: "/home/companias" },
  { label: "Vigiladores", icon: <AssignmentInd />, url: "/home/vigiladores" },
  {
    label: "Inasistencias",
    icon: <FactCheckOutlinedIcon />,
    url: "/home/inasistencias",
  },
  {
    label: "Reportes",
    icon: <QueryStats />,
    suboptions: [
      {
        label: "Compañias",
        icon: <QueryStats />,
        url: "/home/reportes/companias",
      },
      {
        label: "Vigiladores",
        icon: <QueryStats />,
        url: "/home/reportes/vigiladores",
      },
    ],
  },
];

const superAdminOptions = [
  { label: "Admins", icon: <SupervisedUserCircle />, url: "/home/admins" },
];

const SideBarContent = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  let indexOption = 0;

  const Item = ({ option, index, notSelectable, url }) => {
    return (
      <ListItemStyled
        key={option.label}
        selected={pathname === url}
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
        >
          <ListItemIcon
            sx={{
              "&.MuiListItemIcon-root": {
                color: pathname === url && "#9D77E2",
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
        {adminOptions.map((option, i) => {
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
                  paddingLeft: 0,
                },
              }}
            >
              <AccordionSummary
                sx={{
                  margin: 0,
                  paddingLeft: "1px",
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
                  indexOption++;
                  return (
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      key={suboption.label}
                      to={suboption.url}
                    >
                      <Item
                        url={suboption.url}
                        option={suboption}
                        index={indexOption}
                      />
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
              <Item url={option.url} option={option} index={indexOption} />
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
            {superAdminOptions.map((option, i) => {
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
