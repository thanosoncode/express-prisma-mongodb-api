import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouteError } from "react-router-dom";
import theme from "../../theme";

const Error = () => {
  const error: any = useRouteError();
  return (
    <Box
      sx={{
        padding: theme.spacing(0, 12),
        marginTop: theme.spacing(12),
        textAlign: "center",
      }}
    >
      <Typography variant="h6">
        Something went terribly wrong. Try again later.
      </Typography>
      <Typography variant="subtitle1">
        {error.status} {error.statusText}
      </Typography>
    </Box>
  );
};
export default Error;
