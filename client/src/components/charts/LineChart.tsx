import { Typography } from "@mui/material";
import {
  LineChart as ReChartsLineChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
} from "recharts";
import theme from "../../theme";
import LineChartTooltip from "./lineChartTooltip/LineChartTooltip.component";

interface BarChartsProps {
  data: any[];
}

const LineChart: React.FC<BarChartsProps> = ({ data }) => {
  return (
    <ReChartsLineChart width={360} height={280} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <Line
        type="monotone"
        dataKey="topWeight"
        fill={theme.palette.primary.main}
      />
      <Tooltip
        content={<LineChartTooltip />}
        payload={data}
        cursor={{ fill: "none" }}
      />
      <Legend content={<CustomLegend />} />
      <YAxis dataKey="topWeight" />
      <XAxis dataKey="createdAt" />
    </ReChartsLineChart>
  );
};
export default LineChart;

const CustomLegend = () => {
  return (
    <Typography
      variant="subtitle2"
      sx={{ textAlign: "center", color: theme.palette.info.main }}
    >
      Top weight used in set.
    </Typography>
  );
};
