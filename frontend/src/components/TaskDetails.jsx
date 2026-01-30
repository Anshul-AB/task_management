import StatusBadge from "./StatusBadge";

const TaskDetails = ({ task, onClose, onUpdateStatus, onEdit, onDelete }) => {
  if (!task) return null;

  return (
    <div className="w-96 bg-white border-l p-6 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Task Details</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center mb-4">
          <StatusBadge status={task.status} />
          <button
            onClick={onUpdateStatus}
            className="text-sm border px-3 py-1 rounded"
          >
            Update status
          </button>
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Task Title</p>
            <p className="font-medium">{task.title}</p>
          </div>

          <div>
            <p className="text-gray-500">Assigned To</p>
            <p>{task.assignedUserId}</p>
          </div>

          <div>
            <p className="text-gray-500">Description</p>
            <p>{task.description || "No description provided."}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onDelete}
          className="px-4 py-2 text-sm border rounded bg-red-600 text-white hover:bg-red-400"
        >
          Delete
        </button>

        <button
          onClick={onEdit}
          className="px-4 py-2 text-sm bg-primary hover:scale-105 text-white rounded"
        >
          Edit Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
