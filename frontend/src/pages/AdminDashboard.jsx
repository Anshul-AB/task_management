import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TaskTable from "../components/TaskTable";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const countByStatus = (status) =>
    tasks.filter((t) => t.status === status).length;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <input
            placeholder="Search here..."
            className="border px-3 py-2 rounded w-64"
          />
          <span className="text-sm bg-white px-3 py-1 rounded shadow">
            Admin
          </span>
        </div>

        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            title="Total Tasks"
            value={tasks.length}
            color="text-blue-600"
          />
          <StatCard
            title="Pending"
            value={countByStatus("Pending")}
            color="text-yellow-500"
          />
          <StatCard
            title="In Progress"
            value={countByStatus("In Progress")}
            color="text-purple-500"
          />
          <StatCard
            title="Completed"
            value={countByStatus("Completed")}
            color="text-green-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/tasks")}
            className="bg-primary text-white px-6 py-4 rounded shadow"
          >
            All Tasks
          </button>

        </div>

        {/* Task Table */}
        <TaskTable tasks={tasks} />

      </div>
    </div>
  );
};

export default AdminDashboard;
