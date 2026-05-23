import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

      //alert("Login Successful");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-50">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl border border-zinc-200/60 shadow-sm w-[380px]"
      >

        <h1 className="text-2xl font-bold mb-8 text-center text-zinc-900 tracking-tight">
          Welcome back
        </h1>

        <input
          type="email"
          placeholder="Email address"
          className="w-full bg-zinc-50/50 border border-zinc-200 p-3.5 rounded-xl mb-4 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all outline-none placeholder:text-zinc-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-zinc-50/50 border border-zinc-200 p-3.5 rounded-xl mb-6 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all outline-none placeholder:text-zinc-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3.5 rounded-xl font-medium shadow-sm hover:shadow active:scale-[0.98] transition-all"
        >
          Sign in
        </button>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?
          <Link
            to="/signup"
            className="text-zinc-900 font-semibold ml-2 hover:underline"
          >
            Sign up
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;