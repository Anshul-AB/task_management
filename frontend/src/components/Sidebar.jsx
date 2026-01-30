import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const baseClasses =
    "w-full text-left px-3 py-2 rounded transition";

  const activeClasses =
    "bg-white shadow font-medium";

  const inactiveClasses =
    "hover:bg-white";

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-6">Task Management</h2>

      <nav className="space-y-2 flex flex-col">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? activeClasses : inactiveClasses
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? activeClasses : inactiveClasses
            }`
          }
        >
          Tasks
        </NavLink>
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
