import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  FaUsers,
  FaCheckCircle,
  FaChartLine,
  FaTrash,
  FaSearch,
  FaBars,
} from "react-icons/fa";

function Dashboard() {

  const [leads, setLeads] = useState([]);
  const [sidebarOpen, setSidebarOpen] =
  useState(false);
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [status, setStatus] = useState("New");

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  // FETCH LEADS
  const fetchLeads = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/leads"
      );

      setLeads(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // ADD LEAD
  const addLead = async () => {

    if (!companyName || !contactPerson) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/leads",
        {
          companyName,
          contactPerson,
          status,
        }
      );

      fetchLeads();

      setCompanyName("");
      setContactPerson("");
      setStatus("New");

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE LEAD
  const deleteLead = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/leads/${id}`
      );

      fetchLeads();

    } catch (error) {

      console.log(error);

    }
  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  // SEARCH FILTER
  const filteredLeads = leads.filter((lead) =>
    lead.companyName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="flex h-screen bg-zinc-50 overflow-hidden">

  {/* MOBILE TOPBAR */}
<div className="md:hidden fixed top-0 left-0 right-0 bg-white z-40 border-b border-zinc-200 px-5 py-4 flex justify-between items-center">

  {/* LEFT */}
  <div className="flex items-center gap-3">

    <FaBars
      size={22}
      className="cursor-pointer text-zinc-700"
      onClick={() =>
        setSidebarOpen(true)
      }
    />

    <div className="flex items-center gap-2">

      <div className="bg-zinc-900 w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold">
        C
      </div>

      <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
        CRM
      </h1>

    </div>

  </div>


    {/* LOGOUT */}
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

  {/* MAIN CONTENT */}
  <div className="flex-1 p-4 md:p-8 mt-[80px] md:mt-0 overflow-y-auto overflow-x-hidden">

    {/* TOPBAR */}
    <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-5 mb-10">

      {/* LEFT */}
      <div>

        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-2 text-sm md:text-base">
          Monitor your sales pipeline and business growth
        </p>

      </div>


      {/* RIGHT */}
      <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">

        {/* SEARCH */}
        <div className="bg-white border border-zinc-200 rounded-xl px-4 py-2.5 flex items-center gap-3 w-full sm:w-80 shadow-sm focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100 transition-all">

          <FaSearch className="text-zinc-400 text-sm" />

          <input
            type="text"
            placeholder="Search anything..."
            className="outline-none w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

    </div>


    {/* STATS CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {/* TOTAL LEADS */}
      <div className="bg-white rounded-xl border border-zinc-200/60 shadow-sm p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-zinc-500 text-sm font-medium">
              Total Leads
            </p>

            <h2 className="text-3xl font-bold mt-3 text-zinc-900">
              {leads.length}
            </h2>

          </div>

          <div className="bg-zinc-100 text-zinc-900 p-3.5 rounded-xl text-xl">

            <FaUsers />

          </div>

        </div>

      </div>


      {/* INTERESTED */}
      <div className="bg-white rounded-xl border border-zinc-200/60 shadow-sm p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-zinc-500 text-sm font-medium">
              Interested
            </p>

            <h2 className="text-3xl font-bold mt-3 text-zinc-900">

              {
                leads.filter(
                  (lead) =>
                    lead.status === "Interested"
                ).length
              }

            </h2>

          </div>

          <div className="bg-blue-50 text-blue-600 p-3.5 rounded-xl text-xl border border-blue-100/50">

            <FaChartLine />

          </div>

        </div>

      </div>


      {/* CLOSED DEALS */}
      <div className="bg-white rounded-xl border border-zinc-200/60 shadow-sm p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-zinc-500 text-sm font-medium">
              Closed Deals
            </p>

            <h2 className="text-3xl font-bold mt-3 text-zinc-900">

              {
                leads.filter(
                  (lead) =>
                    lead.status === "Closed"
                ).length
              }

            </h2>

          </div>

          <div className="bg-emerald-50 text-emerald-600 p-3.5 rounded-xl text-xl border border-emerald-100/50">

            <FaCheckCircle />

          </div>

        </div>

      </div>

    </div>


    {/* ADD LEAD SECTION */}
    <div className="bg-white mt-8 rounded-xl border border-zinc-200/60 shadow-sm p-6 md:p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

        <div>

          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Add New Lead
          </h2>

          <p className="text-zinc-500 text-sm mt-1">
            Create and manage new client leads
          </p>

        </div>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* COMPANY */}
        <input
          type="text"
          placeholder="Company Name"
          className="bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 outline-none text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400"
          value={companyName}
          onChange={(e) =>
            setCompanyName(e.target.value)
          }
        />


        {/* CONTACT */}
        <input
          type="text"
          placeholder="Contact Person"
          className="bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 outline-none text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400"
          value={contactPerson}
          onChange={(e) =>
            setContactPerson(e.target.value)
          }
        />


        {/* STATUS */}
        <select
          className="bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 outline-none text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all text-zinc-700"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option>New</option>
          <option>Contacted</option>
          <option>Interested</option>
          <option>Closed</option>
          <option>Lost</option>

        </select>


        {/* BUTTON */}
        <button
          onClick={addLead}
          className="bg-zinc-900 hover:bg-zinc-800 transition-all text-white rounded-xl font-medium py-3 shadow-sm hover:shadow active:scale-[0.98]"
        >
          Add Lead
        </button>

      </div>

    </div>


    {/* TABLE SECTION */}
    <div className="bg-white mt-8 rounded-xl border border-zinc-200/60 shadow-sm p-6 md:p-8 overflow-hidden">

      {/* TABLE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

        <div>

          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Recent Leads
          </h2>

          <p className="text-zinc-500 mt-1 text-sm">
            Manage all your latest leads
          </p>

        </div>

      </div>


      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead>

            <tr className="border-b border-zinc-100 text-zinc-500 text-xs uppercase tracking-wider">

              <th className="text-left py-4 font-semibold">
                Company
              </th>

              <th className="text-left py-4 font-semibold">
                Contact Person
              </th>

              <th className="text-left py-4 font-semibold">
                Status
              </th>

              <th className="text-left py-4 font-semibold">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredLeads.map((lead) => (

              <tr
                key={lead._id}
                className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors"
              >

                <td className="py-4 text-sm font-medium text-zinc-900">
                  {lead.companyName}
                </td>

                <td className="py-4 text-sm text-zinc-500">
                  {lead.contactPerson}
                </td>

                <td className="py-4">

                  <span className="bg-zinc-100 border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-full text-xs font-medium inline-block">

                    {lead.status}

                  </span>

                </td>

                <td className="py-4">

                  <button
                    onClick={() =>
                      deleteLead(lead._id)
                    }
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-medium"
                  >

                    <FaTrash />

                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

         </div>

        </div>

       </div>

     </div>
  );
}

export default Dashboard;