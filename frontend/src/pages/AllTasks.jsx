import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import CreateTaskModal from "../components/CreateTaskModal";
import UpdateStatusModal from "../components/UpdateStatusModal";
import TaskDetails from "../components/TaskDetails";

const filters = ["All", "Pending", "Completed", "In Progress"];

const AllTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  // const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      fetchTasks();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

 const handleDeleteTask = async (id) => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    await api.delete(`/tasks/${id}`);

    setSelectedTask(null);
    fetchTasks();
  } catch (err) {
    console.error("DELETE ERROR:", err.response || err);
    alert(err.response?.data?.message || "Failed to delete task");
  }
};



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
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
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
                    {user.role === "user" ? (
                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value)}
                        className="border px-3 py-1 rounded text-sm"
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    ) : (
                      <StatusBadge status={task.status} />
                    )}
                  </td>

                  <td className="p-3 text-gray-500">
                    {task.createdAt
                      ? task.createdAt.seconds
                        ? new Date(
                            task.createdAt.seconds * 1000,
                          ).toLocaleDateString()
                        : new Date(task.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="text-sm px-3 py-1 bg-gray-100 rounded"
                    >
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
          {showStatusModal && (
            <UpdateStatusModal
              task={selectedTask}
              onClose={() => setShowStatusModal(false)}
              onSaved={fetchTasks}
            />
          )}
        </div>

      

        {showForm && (
          <CreateTaskModal
            task={editingTask}
            onClose={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
            onCreated={fetchTasks}
          />
        )}
      </div>

        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdateStatus={() => setShowStatusModal(true)}
            onEdit={() => {
              setEditingTask(selectedTask);
              setShowForm(true);
            }}
             onDelete={() => handleDeleteTask(selectedTask.id)}
          />
        )}
    </div>
  );
};

export default AllTasks;
