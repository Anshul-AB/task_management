import { useEffect, useState } from "react";
import api from "../services/api";

const CreateTaskModal = ({ onClose, onCreated, task }) => {
  const isEdit = Boolean(task);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedUserId, setAssignedUserId] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignedUserId(task.assignedUserId);
    }
  }, [task]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { title, description, assignedUserId };

    if (isEdit) {
      await api.put(`/tasks/${task.id}`, payload);
    } else {
      await api.post("/tasks", payload);
    }

    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Task" : "Create Task"}
          </h2>
          <button onClick={onClose} className="text-gray-400">✕</button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Task title</label>
            <input
              className="w-full mt-1 border px-3 py-2 rounded"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full mt-1 border px-3 py-2 rounded"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Assigned User</label>
            <select
              className="w-full mt-1 border px-3 py-2 rounded"
              value={assignedUserId}
              onChange={e => setAssignedUserId(e.target.value)}
              required
            >
              <option value="">Assign to</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary text-white"
            >
              {isEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
