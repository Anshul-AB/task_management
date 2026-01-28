const TaskTable = ({ tasks }) => {
  return (
    <table className="w-full mt-6 bg-white rounded shadow">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Title</th>
          <th className="p-3">Status</th>
          <th className="p-3">Assigned User</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id} className="border-t">
            <td className="p-3">{task.title}</td>
            <td className="p-3">{task.status}</td>
            <td className="p-3">{task.assignedUserId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
