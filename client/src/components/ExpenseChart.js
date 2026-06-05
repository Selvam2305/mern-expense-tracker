import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ income, expense }) {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#2ecc71", "#e74c3c"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ textAlign: "center" }}>Income vs Expense</h3>
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;