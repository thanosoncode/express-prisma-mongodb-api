import {
  Bar,
  BarChart as ReChartsBarChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import theme from "../../theme";
import BarTooltip from "./BarChartTooltip";

interface BarChartsProps {
  data: any[];
}

const BarChart: React.FC<BarChartsProps> = ({ data }) => {
  return (
    <ReChartsBarChart width={640} height={360} data={data}>
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
      <Legend />
      <YAxis dataKey="volume" />
      <XAxis dataKey="createdAt" />
    </ReChartsBarChart>
  );
};
export default BarChart;
