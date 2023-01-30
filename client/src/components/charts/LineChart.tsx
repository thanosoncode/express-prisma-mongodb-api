import {
  Bar,
  LineChart as ReChartsLineChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
} from "recharts";
import theme from "../../theme";
import BarTooltip from "./BarChartTooltip";
import LineChartTooltip from "./LineChartTooltip";

interface BarChartsProps {
  data: any[];
}

const LineChart: React.FC<BarChartsProps> = ({ data }) => {
  return (
    <ReChartsLineChart width={640} height={360} data={data}>
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
      <Legend />
      <YAxis dataKey="topWeight" />
      <XAxis dataKey="createdAt" />
    </ReChartsLineChart>
  );
};
export default LineChart;
