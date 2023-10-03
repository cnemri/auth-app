"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewPasswordPage() {
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const password = e.target.password.value;
      const confirmpassword = e.target.confirmpassword.value;
      if (password !== confirmpassword) {
        throw new Error("Passwords do not match");
      }
      await axios.post("/api/users/newpwd", { token, password });
      setSuccess(true);
      setError(false);
    } catch (error: any) {
      console.log(error);
      //   toast.error(error.message, {
      //     position: "top-center",
      //   });
      setError(true);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="block text-gray-600">
            New Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
          <label htmlFor="confirmpassword" className="block text-gray-600 mt-4">
            Confirm Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            id="confirmpassword"
            type="password"
            placeholder="Password"
            required
          />
          <button
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mt-4`}
          >
            Reset Password
          </button>
        </form>
        {success && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-green-500 mt-4 bg-green-50 rounded-lg text-center">
              Password reset successfully. Please login with your new password.
            </p>
            <Link href="/login" className="text-blue-500 hover:underline">
              Go to login &rarr;
            </Link>
          </div>
        )}
        {error && (
          <p className="text-red-500 mt-4 bg-red-50 rounded-lg text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
