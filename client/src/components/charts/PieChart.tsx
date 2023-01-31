import {
  PieChart as ReChartsPieChart,
  Pie,
  Tooltip,
  Cell,
  Label,
} from "recharts";
import theme from "../../theme";
import { Exercise } from "../../utils/models";

interface PieChartsProps {
  data: Exercise[];
}

const PieChart: React.FC<PieChartsProps> = ({ data }) => {
  const totalReps = data.reduce((total, item) => {
    return total + Number(item.reps) * Number(item.sets);
  }, 0);
  const exercises = data.map((ex) => ({
    name: ex.name,
    amount: Math.floor((Number(ex.reps) * Number(ex.sets) * 40) / totalReps),
  }));

  const COLORS = [
    theme.palette.grey[300],
    theme.palette.grey[400],
    theme.palette.grey[500],
    theme.palette.grey[600],
  ];

  return (
    <ReChartsPieChart
      width={300}
      height={200}
      margin={{ left: 40, top: 40, right: 40, bottom: 40 }}
    >
      <Pie
        data={exercises}
        cx="50%"
        cy="50%"
        dataKey="amount"
        label={(entry: { name: string; amount: number }) =>
          entry.name.split(" ")[0]
        }
      >
        {exercises.map((entry, index) => {
          console.log(entry.amount);
          return <Cell fill={COLORS[index % COLORS.length]}></Cell>;
        })}
      </Pie>
      <Tooltip />
    </ReChartsPieChart>
  );
};

export default PieChart;
