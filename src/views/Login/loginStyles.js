import { styled } from "@mui/system";
import { Grid } from "../../styles/material";

export const LoginImage = styled(Grid)(({ theme }) => ({
  backgroundImage: "url(https://images.pexels.com/photos/1432676/pexels-photo-1432676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) => t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  "&::before": {
    content: '""',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    position: "absolute",
    backgroundImage: "linear-gradient(to bottom, blue 0%, purple 100%)",
    opacity: "0.4",
  },
}));
