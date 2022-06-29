import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SideBarContent from "./SideBarContent";
import { IconButton } from "../../styles/material";
import { MenuIcon } from "../../styles/materialIcons";


const drawerWidth = 280;

function ResponsiveDrawer({...props}) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <IconButton sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,top:{sm:"15px",xs:"10px"},left:"5px",position:"fixed",display:{xs:"block",sm:"none"} }}>
        <MenuIcon fontSize="medium" sx={{color:"white"}} onClick={handleDrawerToggle}/>
      </IconButton>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        
        }}
      >
        <SideBarContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth,borderRight:"none" },
        }}
        open
      >
        <SideBarContent/>
      </Drawer>
    </Box>
  );
}

export default ResponsiveDrawer;
