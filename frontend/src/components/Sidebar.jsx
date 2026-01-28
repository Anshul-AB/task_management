import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-6">Task Management</h2>

      <nav className="space-y-2">
        <button className="w-full text-left px-3 py-2 rounded bg-white shadow">
          Dashboard
        </button>
        <button
          onClick={() => navigate("/tasks")}
          className="w-full text-left px-3 py-2 rounded hover:bg-white"
        >
          Tasks
        </button>
      </nav>

      <button
        onClick={logout}
        className="mt-auto text-sm text-gray-500 hover:text-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
