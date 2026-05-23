import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("https://leadflow-crm-yvk1.onrender.com/api/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-40 border-b border-zinc-200 px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FaBars
            size={22}
            className="cursor-pointer text-zinc-700"
            onClick={() => setSidebarOpen(true)}
          />
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold">
              C
            </div>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">CRM</h1>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="border border-zinc-200 hover:bg-zinc-50 transition-all text-zinc-700 px-4 py-2 rounded-xl text-sm font-medium shadow-sm"
        >
          Logout
        </button>
      </div>

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />

      <div className="flex-1 p-4 md:p-8 mt-[80px] md:mt-0 overflow-y-auto overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 tracking-tight">All Leads</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="bg-white p-6 rounded-xl border border-zinc-200/60 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col items-start"
            >
              <h2 className="text-lg font-bold text-zinc-900">
                {lead.companyName}
              </h2>
              <p className="text-zinc-500 mt-1 text-sm">{lead.contactPerson}</p>
              <span className="inline-block mt-4 bg-zinc-100 border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-full text-xs font-medium">
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leads;