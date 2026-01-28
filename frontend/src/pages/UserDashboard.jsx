import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";

const UserDashboard = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const updateStatus = async (taskId, status) => {
    await api.patch(`/tasks/${taskId}/status`, { status });
    fetchTasks();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Tasks</h1>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Task Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-t">
                  <td className="p-3 font-medium">{task.title}</td>
                  <td className="p-3 text-gray-500">
                    {task.description}
                  </td>
                  <td className="p-3">
                    <select
                      value={task.status}
                      onChange={e =>
                        updateStatus(task.id, e.target.value)
                      }
                      className="border px-3 py-1 rounded"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td>
                </tr>
              ))}

              {tasks.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="p-6 text-center text-gray-400"
                  >
                    No tasks assigned to you
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
