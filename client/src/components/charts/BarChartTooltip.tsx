import { Box, Typography } from "@mui/material";
import theme from "../../theme";

const BarTooltip = ({
  active,
  payload,
}: {
  payload?: any;
  active?: boolean;
}) => {
  if (active && payload) {
    return (
      <Box
        sx={{
          border: `1px solid ${theme.palette.grey[500]}`,
          borderRadius: "5px",
          padding: theme.spacing(0.5, 3),
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h6">
            {payload[0].payload.sets}
            {" x "}
            {payload[0].payload.reps}
          </Typography>
          <Typography sx={{ color: theme.palette.primary.main }}>
            {payload[0].payload.weight} kg
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

export default BarTooltip;
