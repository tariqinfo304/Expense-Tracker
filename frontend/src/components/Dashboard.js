import { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [report, setReport] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchReport();
  }, [year, month]);

  useEffect(() => {
    // Cleanup chart instance on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  const fetchReport = async () => {
    try {
      const res = await api.get('/expenses/report', { params: { year, month } });
      setReport(res.data);
    } catch (error) {
      console.error('Error fetching report:', error.response?.data || error.message);
      // alert('Error fetching report');
    }
  };

  const chartData = {
    labels: report.map((item) => item.category),
    datasets: [
      {
        label: 'Total Expenses',
        data: report.map((item) => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Monthly Expense Report</h2>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {[...Array(12).keys()].map((m) => (
          <option key={m + 1} value={m + 1}>
            {m + 1}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <Bar
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Monthly Expense Report',
            },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;