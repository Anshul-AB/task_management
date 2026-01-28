import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import CreateTaskModal from "../components/CreateTaskModal";


const filters = ["All", "Pending", "Completed", "In Progress"];

const AllTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const filteredTasks =
    activeFilter === "All"
      ? tasks
      : tasks.filter((t) => t.status === activeFilter);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <input
            placeholder="Search here..."
            className="border px-3 py-2 rounded w-64"
          />
          <span className="text-sm bg-white px-3 py-1 rounded shadow">
            {user.role}
          </span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">All Tasks</h1>
            <p className="text-sm text-gray-500">
              Manage, assign, and track tasks across your team
            </p>
          </div>

          {user.role === "admin" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Create Task
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeFilter === f ? "bg-primary text-white" : "bg-white border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Task ID</th>
                <th className="p-3 text-left">Task Title</th>
                <th className="p-3 text-left">Assigned To</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Created On</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="p-3 text-gray-500">#{task.id.slice(0, 5)}</td>
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.assignedUserId || "-"}</td>
                  <td className="p-3">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="p-3 text-gray-500">
                    {task.createdAt?.seconds
                      ? new Date(
                          task.createdAt.seconds * 1000,
                        ).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-3">
                    <button className="text-sm px-3 py-1 bg-gray-100 rounded">
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <CreateTaskModal
            onClose={() => setShowModal(false)}
            onCreated={fetchTasks}
          />
        )}
      </div>
    </div>
  );
};

export default AllTasks;
