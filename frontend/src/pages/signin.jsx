import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userSign } from "../services/userLogin";

function Register(){
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [role,setUserRole] = useState("");

    const navigate = useNavigate();

    const handleSignin = async(e) => {
        e.preventDefault();

        try{
            const response = await userSign({
                userName,
                userEmail,
                userPassword,
                role
            });

            console.log(response);

            localStorage.setItem(
                "token",
                response.accessToken
            );

        } catch(error){
        console.log("Backend Error:");
        console.log(error.response?.data);
        alert("Signin Failed");
        }
    };

   return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          AsherDn
        </h1>

        <p className="text-gray-500 mt-2">
          Create a New Account
        </p>
      </div>

      <form onSubmit={handleSignin} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
          />
        </div>

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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>

          <select
            value={role}
            onChange={(e) => setUserRole(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
          >
            <option value="">Select Role</option>
            <option value="Intern">Intern</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>

      </form>

      {/* Login Link */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <Link
          to="/login"
          className="ml-2 text-blue-600 hover:underline font-medium"
        >
          Login
        </Link>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        © 2026 AsherDn. All rights reserved.
      </div>

    </div>
  </div>
);
}

export default Register;