import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import theme from "../theme";
import Navbar from "./navbar/Navbar.component";

const RootLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowX: "hidden",
        marginRight: "calc(-1 * (100vw - 100%))",
        paddingBottom: theme.spacing(8),
      }}
    >
      <Navbar />
      <Box sx={{ maxWidth: 792, margin: "0 auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default RootLayout;
