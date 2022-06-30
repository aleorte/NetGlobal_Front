import * as React from "react";
import NetglobalIcon from "../../assets/NetGlobal-Horizontal-Blanco.png";
import {
  Box,
  Typography,
  Button,
  Toolbar,
  AppBar,
} from "../../styles/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AddGuard } from "../Modals/guard/AddGuard";

export default function Navbar() {
  const user = useSelector((state) => state.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,height:"58px" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  transition: { duration: 1.5, ease: "easeInOut" },
                  x: user.userInfo.name ? 30 : 0,
                },
              }}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", alignContent: "center" }}
            >
              <img
                src={NetglobalIcon}
                alt="netglobal"
                width="160px"
                height="40px"
              />
            </motion.div>
          </Typography>
          {user.userInfo.name && <Button color="inherit">Cerrar Sesion</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
