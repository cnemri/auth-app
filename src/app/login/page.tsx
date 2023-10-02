"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onLogin}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>
        <label htmlFor="email" className="block text-gray-600">
          Email
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="jdoe@example.com"
          required
        />
        <label htmlFor="password" className="block text-gray-600 mt-4">
          Password
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          required
        />
        <button
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full ${
            buttonDisabled && "opacity-50 cursor-not-allowed"
          } mt-4`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>
        <Link
          href="/signup"
          className="text-blue-500 hover:underline mt-4 block text-center"
        >
          Not a member? Signup here
        </Link>
      </div>
    </form>
  );
}
