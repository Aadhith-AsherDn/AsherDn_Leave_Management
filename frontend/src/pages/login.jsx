import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userLogin } from "../services/userLogin";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        userEmail,
        userPassword,
      });

      console.log(response);

      localStorage.setItem(
        "token",
        response.accessToken
      );

      navigate("/dashboard");

      } catch (error) {
    console.log("Backend Error:");

    console.log(error.response?.data);

    console.log(error);

    alert("Login Failed");
  }
  };

return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          AsherDn
        </h1>

        <p className="text-gray-500 mt-2">
          Leave Management System
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            to="/forgetPassword"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        © 2026 AsherDn. All rights reserved.
      </div>

    </div>
  </div>
);
}

export default Login;