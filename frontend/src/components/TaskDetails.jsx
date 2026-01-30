import StatusBadge from "./StatusBadge";

const TaskDetails = ({ task, onClose, onUpdate }) => {
  if (!task) return null;

  return (
    <div className="w-96 bg-white border-l p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Task Details</h3>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <StatusBadge status={task.status} />
          <button
            onClick={onUpdate}
            className="text-sm border px-3 py-1 rounded"
          >
            Update status
          </button>
        </div>

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
  );
};

export default TaskDetails;
