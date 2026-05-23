import {
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  handleLogout,
}) {

  const location = useLocation();

  return (

    <>

      {/* OVERLAY */}
      {
        sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          />
        )
      }

      {/* SIDEBAR */}
      <div
        className={`

        fixed md:static top-0 left-0 z-50

        h-screen w-72 bg-white border-r border-zinc-200

        flex flex-col justify-between p-6

        transition-transform duration-300

        ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"}

        md:translate-x-0

      `}
      >

        <div>

          {/* TOP */}
          <div className="flex items-center justify-between mb-10">

            <div className="flex items-center gap-3">

              <div className="bg-zinc-900 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">

                C

              </div>

              <div>

                <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
                  CRM
                </h1>

                <p className="text-xs font-medium text-zinc-500">
                  Lead Management
                </p>

              </div>

            </div>

            {/* MOBILE CLOSE */}
            <button
              className="md:hidden"
              onClick={() =>
                setSidebarOpen(false)
              }
            >

              <FaTimes size={22} />

            </button>

          </div>


          {/* MENU */}
          <ul className="space-y-2">

            {/* DASHBOARD */}
            <Link to="/dashboard">

              <li
                className={`

                px-4 py-3 rounded-xl text-sm font-medium

                cursor-pointer flex items-center gap-3

                transition-all duration-200

                ${location.pathname === "/dashboard"
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}

              `}
              >

                <FaChartLine className="text-lg" />

                Dashboard

              </li>

            </Link>


            {/* LEADS */}
            <Link to="/leads">

              <li
                className={`

                px-4 py-3 rounded-xl text-sm font-medium

                cursor-pointer flex items-center gap-3

                transition-all duration-200

                ${location.pathname === "/leads"
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}

              `}
              >

                <FaUsers className="text-lg" />

                Leads

              </li>

            </Link>

          </ul>

        </div>


        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 text-zinc-700 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm shadow-sm"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </>
  );
}

export default Sidebar;