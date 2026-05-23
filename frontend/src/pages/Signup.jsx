import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://leadflow-crm-yvk1.onrender.com/api/auth/register",
        formData
      );

      const res = await axios.post(
        "https://leadflow-crm-yvk1.onrender.com/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-zinc-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl border border-zinc-200/60 shadow-sm w-[380px]"
      >
        <h1 className="text-2xl font-bold mb-8 text-center text-zinc-900 tracking-tight">
          Create an account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full bg-zinc-50/50 border border-zinc-200 p-3.5 rounded-xl mb-4 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all outline-none placeholder:text-zinc-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          onChange={handleChange}
          className="w-full bg-zinc-50/50 border border-zinc-200 p-3.5 rounded-xl mb-4 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all outline-none placeholder:text-zinc-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full bg-zinc-50/50 border border-zinc-200 p-3.5 rounded-xl mb-6 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all outline-none placeholder:text-zinc-400"
        />

        <button
          type="submit"
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3.5 rounded-xl font-medium shadow-sm hover:shadow active:scale-[0.98] transition-all"
        >
          Sign up
        </button>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?
          <Link
            to="/"
            className="text-zinc-900 font-semibold ml-2 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;