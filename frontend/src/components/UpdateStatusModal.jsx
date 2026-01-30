import { useState } from "react";
import api from "../services/api";

const UpdateStatusModal = ({ task, onClose, onSaved }) => {
  const [status, setStatus] = useState(task.status);

  const handleSave = async () => {
    await api.patch(`/tasks/${task.id}/status`, { status });
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Task Status</h3>

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-6"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
