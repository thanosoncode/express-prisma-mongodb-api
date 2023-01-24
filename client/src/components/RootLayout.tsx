import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import theme from "../theme";
import Navbar from "./navbar/Navbar.component";

const RootLayout = () => {
  return (
    <Box
      sx={{
        padding: theme.spacing(0, 12),
      }}
    >
      <Navbar />
      <Outlet />
    </Box>
  );
};
export default RootLayout;
