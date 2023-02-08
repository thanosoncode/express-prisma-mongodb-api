import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {
  Bar,
  BarChart as ReChartsBarChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import theme from "../../theme";
import BarTooltip from "./barChartTooltip/BarChartTooltip.component";

interface BarChartsProps {
  data: any[];
}

const BarChart: React.FC<BarChartsProps> = ({ data }) => {
  return (
    <ReChartsBarChart width={360} height={280} data={data}>
      <Bar
        dataKey="volume"
        fill={theme.palette.primary.main}
        barSize={20}
      ></Bar>
      <Tooltip
        content={<BarTooltip />}
        payload={data}
        cursor={{ fill: "none" }}
      />
      <Legend content={<CustomLegend />} />
      <YAxis dataKey="volume" />
      <XAxis dataKey="createdAt" />
    </ReChartsBarChart>
  );
};
export default BarChart;

const CustomLegend = () => {
  return (
    <Typography
      variant="subtitle2"
      sx={{ textAlign: "center", color: theme.palette.info.main }}
    >
      Amount of volume &#40;sets x reps x weight&#41;
    </Typography>
  );
};
