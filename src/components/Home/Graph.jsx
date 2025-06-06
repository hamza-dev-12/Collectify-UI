import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Graph = ({ data }) => {
  const COLORS = ["#16a34a", "#ca8a04"];

  return (
    <div className="graph w-full h-64 md:h-80 lg:h-96 px-8 ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={60}
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
