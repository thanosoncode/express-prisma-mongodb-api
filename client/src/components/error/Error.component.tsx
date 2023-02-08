import Box from "@mui/material/Box";
import { useRouteError } from "react-router-dom";
import theme from "../../theme";
import Navbar from "../navbar/Navbar.component";

const Error = () => {
  const error: any = useRouteError();
  return (
    <Box
      sx={{
        padding: theme.spacing(0, 12),
      }}
    >
      <Navbar />
      <p>
        {error.status} {error.statusText}
      </p>
    </Box>
  );
};
export default Error;
