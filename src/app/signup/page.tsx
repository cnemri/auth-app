"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <form
      onSubmit={onSignup}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-6">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <label htmlFor="username" className="block text-gray-600">
          Username
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="John Doe"
          required
        />
        <label htmlFor="email" className="block text-gray-600 mt-4">
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
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        {error && (
          <div className="text-red-500  mt-2 bg-red-50 py-1 rounded-3xl text-center">
            User already exists
          </div>
        )}
        <Link
          href="/login"
          className="text-blue-500 hover:underline mt-4 block text-center"
        >
          Already a member? Login here
        </Link>
      </div>
    </form>
  );
}
