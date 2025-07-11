import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaUsers, 
  FaBoxOpen, 
  FaClipboardList, 
  FaRupeeSign,
  FaArrowUp,
  FaShoppingCart
} from "react-icons/fa";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from "chart.js";
import { motion } from "framer-motion";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ 
    users: 0, 
    products: 0, 
    orders: 0, 
    revenue: 0,
    userGrowth: 0,
    revenueGrowth: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({ 
    orders: [], 
    revenue: [], 
    statusDistribution: [],
    labels: [] 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, productRes] = await Promise.all([
          axios.get("https://shoecart-4ug1.onrender.com/users"),
          axios.get("https://shoecart-4ug1.onrender.com/products"),
        ]);

        const users = userRes.data;
        const products = productRes.data;
        let allOrders = [];
        
        // Collect all orders and calculate status distribution
        const statusCounts = {
          pending: 0,
          shipped: 0,
          delivered: 0,
          cancelled: 0
        };

        users.forEach((user) => {
          if (Array.isArray(user.orders)) {
            user.orders.forEach(order => {
              allOrders.push(order);
              const status = order.deliveryStatus || 'pending';
              statusCounts[status]++;
            });
          }
        });

        // Calculate growth percentages (mock data for demonstration)
        const userGrowth = 12.5; // Would calculate from previous data in real app
        const revenueGrowth = 8.3;

        const totalRevenue = allOrders.reduce(
          (sum, order) =>
            order.paymentStatus === "completed"
              ? sum + Number(order.totalAmount || 0)
              : sum,
          0
        );

        // Prepare last 7 days data
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (6 - i));
          return d.toISOString().split("T")[0];
        });

        const ordersByDay = last7Days.map((day) =>
          allOrders.filter((o) => o.createdAt?.includes(day)).length
        );

        const revenueByDay = last7Days.map((day) =>
          allOrders
            .filter((o) => o.createdAt?.includes(day) && o.paymentStatus === "completed")
            .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0)
        );

        setStats({
          users: users.length,
          products: products.length,
          orders: allOrders.length,
          revenue: totalRevenue,
          userGrowth,
          revenueGrowth
        });

        setChartData({
          orders: ordersByDay,
          revenue: revenueByDay,
          statusDistribution: Object.values(statusCounts),
          labels: last7Days.map((d) =>
            new Date(d).toLocaleDateString("en-US", { weekday: "short", day: "numeric" })
          ),
        });
      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );

  // Chart data configurations
  const barChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Daily Orders",
        data: chartData.orders,
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderRadius: 6,
        borderWidth: 0
      },
    ],
  };

  const lineChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Daily Revenue",
        data: chartData.revenue,
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        borderWidth: 2
      },
    ],
  };

  const donutChartData = {
    labels: ["Pending", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        data: chartData.statusDistribution,
        backgroundColor: [
          "rgba(245, 158, 11, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(239, 68, 68, 0.7)"
        ],
        borderColor: [
          "rgba(245, 158, 11, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(239, 68, 68, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { 
      legend: { 
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle"
        }
      }, 
      tooltip: { 
        mode: "index", 
        intersect: false,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 12
      } 
    },
    scales: { 
      y: { 
        beginAtZero: true,
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    maintainAspectRatio: false,
  };

  const donutOptions = {
    ...chartOptions,
    cutout: "70%",
    plugins: {
      ...chartOptions.plugins,
      legend: {
        position: "right"
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<FaUsers className="text-xl" />} 
          label="Total Users" 
          value={stats.users} 
          growth={stats.userGrowth}
          color="indigo"
        />
        <StatCard 
          icon={<FaShoppingCart className="text-xl" />} 
          label="Total Orders" 
          value={stats.orders} 
          color="blue"
        />
        <StatCard 
          icon={<FaBoxOpen className="text-xl" />} 
          label="Products" 
          value={stats.products} 
          color="emerald"
        />
        <StatCard 
          icon={<FaRupeeSign className="text-xl" />} 
          label="Total Revenue" 
          value={`₹${stats.revenue.toLocaleString()}`} 
          growth={stats.revenueGrowth}
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ChartBox title="Order Trends (7 Days)">
          <Bar data={barChartData} options={chartOptions} />
        </ChartBox>
        <ChartBox title="Revenue Trends (7 Days)">
          <Line data={lineChartData} options={chartOptions} />
        </ChartBox>
        <ChartBox title="Order Status Distribution">
          <Doughnut data={donutChartData} options={donutOptions} />
        </ChartBox>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardBtn 
          color="indigo" 
          label="Manage Users" 
          icon={<FaUsers />}
          onClick={() => navigate("/admin/users")} 
        />
        <DashboardBtn 
          color="emerald" 
          label="Manage Products" 
          icon={<FaBoxOpen />}
          onClick={() => navigate("/admin/products")} 
        />
        <DashboardBtn 
          color="blue" 
          label="Manage Orders" 
          icon={<FaClipboardList />}
          onClick={() => navigate("/admin/orders")} 
        />
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, growth, color }) => {
  const colorClasses = {
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      growth: "text-indigo-500"
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      growth: "text-blue-500"
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      growth: "text-emerald-500"
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      growth: "text-green-500"
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${colorClasses[color].bg} p-6 rounded-xl shadow-sm border border-gray-100`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {growth && (
            <div className="flex items-center mt-2">
              <FaArrowUp className={`${colorClasses[color].growth} mr-1`} />
              <span className={`text-sm ${colorClasses[color].growth}`}>{growth}% from last week</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color].bg} ${colorClasses[color].text}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const ChartBox = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">{title}</h3>
    <div className="h-72">{children}</div>
  </div>
);

const DashboardBtn = ({ color, label, icon, onClick }) => {
  const colorClasses = {
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    emerald: "bg-emerald-600 hover:bg-emerald-700"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${colorClasses[color]} text-white py-3 px-6 rounded-lg transition shadow-md flex items-center justify-center gap-2`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
};

export default AdminDashboard;