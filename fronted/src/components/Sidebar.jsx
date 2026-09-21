import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "Add Subscription", path: "/add-subscription" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-[#E9E7FF] px-5 py-6">

      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-[#6246E5]">
          oneSub
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          Track. Manage. Save.
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-10 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[#6246E5] text-white"
                  : "text-gray-700 hover:bg-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Info Card */}
      <div className="mt-auto rounded-xl bg-white p-4">
        <p className="text-sm font-semibold text-[#171717]">
          Stay on top of your subscriptions
        </p>

        <p className="mt-2 text-xs leading-5 text-gray-500">
          Never miss a payment or renewal.
        </p>
      </div>

      {/* Logout */}
      <button
        className="mt-4 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-white"
      >
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;